# Mandos

dmenu integration for bw-cli

# Requirements

- deno
- make
- bitwarden cli
- dmenu
<!-- - xclip -->

# Installation

Make sure the Deno installation root is in your path:
```Bash
export PATH="${HOME}/.deno/bin:$PATH"
```

Install:
```Bash
make install
```

# Usage

<!-- todo: add links -->
Using Mandos requires you to be logged in with Bitwarden CLI and running
the local Bitwarden CLI server.

Check your logged-in status:
```Bash
bw status | jq
```
```Bash
# sample output
{
  "serverUrl": null,
  "lastSync": "2022-04-11T00:30:45.204Z",
  "userEmail": "*****",
  "userId": "*****",
  "status": "unlocked"
}
```

If `"status"` is anything other than `"unlocked"`, Mandos will not do anything.

Start the Bitwarden CLI server:
```Bash
bw serve
```

Verify if the server is running:
```Bash
curl 'http://localhost:8087/status' | jq # should have same output as `bw status`
```

If everything is working, run:
```Bash
mandos
```

