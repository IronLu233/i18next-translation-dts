# i18next-translation-dts

A i18next translation key type definition generator.

## install
``` sh
npm i i18next-translation-dts
# or use yarn
yarn add i18next-translation-dts
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
import { getI18nextDefinition, generateI18nextDefinitionFile } from 'i18next-translation-dts'
getI18nextDefinition()

generateI18nextDefinitionFile()
```
