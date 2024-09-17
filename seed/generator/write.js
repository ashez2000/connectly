import fs from 'node:fs'

export function writeJson(name, data) {
  fs.writeFileSync('./data/' + name + '.json', JSON.stringify(data))
}
