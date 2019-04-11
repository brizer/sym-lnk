# sym-lnk

Manage symbolic links based on aliases.

# Install

```shell
$ npm install sym-lnk
```

# Usage

```javascript
const symlink = require("sym-lnk");

symLink.addSymlink({
  configs: [
    {
      path: "/Users/liufang/Neteasework/front-study",
      alias: "front-study"
    },
    {
      path: "/Users/liufang/Neteasework/front-study-web",
      alias: "front-study-web"
    },
    {
      path: "/Users/liufang/Neteasework/front-study-cp",
      alias: "front-study-cp"
    }
  ]
});

symLink.rmSymlink({
  configs: [
    {
      path: "/Users/liufang/Neteasework/front-study",
      alias: "front-study"
    },
    {
      path: "/Users/liufang/Neteasework/front-study-web",
      alias: "front-study-web"
    },
    {
      path: "/Users/liufang/Neteasework/front-study-cp",
      alias: "front-study-cp"
    }
  ]
});
```

# API

## addSymlink

add symbolic links according to configuration in current path.

- config (Array)

  - path:symbolic target path
  - alias: symbolic source alias

- force (Boolean)
  if symbolic link is exists,delete it and reconstruct.

## rmSymlink

remove symbolic links according to configuration in current path.

- config (Array)

  - path:symbolic target path
  - alias: symbolic source alias


# Want to contribute?

Any idea to improve this project would be greatly appreciated.