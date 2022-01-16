const fs = require('fs')

const ENV_FILE = '.env.local'

const envDefault = `
NEXT_PUBLIC_MAGIC_PUB_KEY=<replace_me>
`

fs.writeFileSync(ENV_FILE, envDefault, { flag: 'wx' })
