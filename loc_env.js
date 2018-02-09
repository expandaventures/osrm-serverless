'use strict';
fs = require('fs');
fs.createReadStream('/var/task/lib/libstdc++.so.6')
  .pipe(fs.createWriteStream('/usr/local/lib64/node-v4.3.x/lib/libstdc++.so.6'));
