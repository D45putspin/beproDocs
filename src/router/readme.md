# Router

## Structure

_Note: Route folder structure should follow its url counterpart._

|file|description|
|---|---|
|index.ts|Exports application routes imported from other folders|
|componets.ts|Exports functional imports to the views over at `@/views` so these can be lazy loaded by routes|
|route-names.ts|Exports route names application wide|
|meta/|Exports route meta extensions|
