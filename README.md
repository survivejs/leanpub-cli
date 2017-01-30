[![build status](https://secure.travis-ci.org/survivejs/leanpub-cli.svg)](http://travis-ci.org/survivejs/leanpub-cli)
# leanpub-cli - CLI Client for Leanpub

This CLI provides basic commands to deal with Leanpub.

## Usage

You have to set up `~/.leanpub.json` that contains your [api key](https://leanpub.com/help/api) like this:

```json
{
  "apiKey": "dig this from Leanpub UI"
}
```

After that you can invoke the cli:

```bash
leanpub-cli <command> <book slug>
```

If you run the command without any parameters, you can see the available commands.

## License

*leanpub-cli* is available under MIT. See LICENSE for more details.
