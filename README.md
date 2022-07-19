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
i18next-dts "**/translation/*.json"
# watch mode
i18next-dts "**/translation/*.json" --watch
```

### API(TBD)
``` javascript
import { getI18nextDefinition, generateI18nextDefinitionFile } from 'ts-i18next-type'
getI18nextDefinition()

generateI18nextDefinitionFile()
```
