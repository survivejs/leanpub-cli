#!/usr/bin/env node
const path = require('path');
const minimist = require('minimist');
const homedir = require('homedir')();
const leanpub = require('leanpub');

try {
  var apiKey;

  try {
    apiKey = require(path.join(homedir, '.leanpub.json')).apiKey;
  } catch(err) {
    throw new Error('Failed to find ~/.leanpub.json apiKey field');
  }

  if (!apiKey) {
    throw new Error('No apiKey');
  }

  const argv = minimist(process.argv.slice(2));

  main(argv._[0], argv._[1], apiKey);
} catch(e) {
  console.error(e);
}

function main(target, bookSlug, apiKey) {
  const targets = {
    'job-status': jobStatus,
    'preview': preview,
    'silent-publish': silentPublish
  };

  if (!(target in targets)) {
    throw new Error(`No matching target. Try one of ${Object.keys(targets).join(', ')}.`);
  }

  if (!bookSlug) {
    throw new Error('Missing target book after target');
  }

  targets[target](
    leanpub({ apiKey, bookSlug })
  );
}

function jobStatus(client) {
  var previousMessage;

  // Poll for job status now until done
  pollJobStatus(1000);

  function pollJobStatus(delay) {
    setTimeout(function() {
      client.jobStatus(function(err, d) {
        if(err) {
         return console.error(err);
        }

        if (d.status) {
          if(previousMessage !== d.message) {
            console.log(d.message);

            previousMessage = d.message;
          }

          pollJobStatus(delay);
        } else {
          console.log('Done');
        }
      });
    }, delay);
  }
}

function preview(client) {
  client.previewFull(function(err) {
    if(err) {
     return console.error(err);
    }
  });
}

function silentPublish(client) {
  client.publish(function(err) {
    if(err) {
     return console.error(err);
    }
  });
}
