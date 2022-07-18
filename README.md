# ts-i18next-type

A i18next translation key type definition generator.

## install
``` sh
npm i ts-i18next-type
# or use yarn
yarn add ts-i18next-type
```

## Usage
### CLI
``` sh
ts-i18next "**/translation/*.json"
# watch mode
ts-i18next "**/translation/*.json" --watch
```

### API
``` javascript
import { getI18nextDefinition, generateI18nextDefinitionFile } from 'ts-i18next-type'
getI18nextDefinition()

generateI18nextDefinitionFile()
```
