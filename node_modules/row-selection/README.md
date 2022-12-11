# row-selection

## Summary

jQuery based plugin enabling click, ctrl + click, shift + click behaviour using table/list like elements.

## Install

```sh
$ npm install row-selection --save
```

## Usage
```html
<table class="facts-table">
    <tbody>
        <tr>
            <td>1.</td>
            <td>There are more lifeforms living on your skin than there are people on the planet.</td>
        </tr>
        <tr>
            <td>2.</td>
            <td>Bolts of lightning can shoot out of an erupting volcano.</td>
        </tr>
        <tr>
            <td>3.</td>
            <td>Chewing gum while you cut an onion will help keep you from crying.</td>
        </tr>
        <tr>
            <td>4.</td>
            <td>Earth has traveled more than 5,000 miles in the past 5 minutes.</td>
        </tr>
    </tbody>
</table>
```

```javascript
'use strict';
$('.facts-table').uiSelectableRow({
  rowIdentifier: 'tr',
  selectRowIfTargetIs: 'td',
  selectedRowClass: 'fact-selected'
});
```

```CSS
.fact-selected {
    background: #87ceeb;
    color: #fff;
}
```
## Option

|Property|Type|Usage|Default|Required|
|---|---|---|---|---|
|rowIdentifier|string|CSS selector targeting the row. In case of table, it's usually 'tr', in case of list, it usually 'li'. This is element to which the 'selected' row class is attached to|```tbody tr```|yes|
|selectRowIfTargetIs|array|Array of CSS selector, which if matches will select the row; selectRowIfTargetIs takes priority over selectRowIfTargetIsNot.|```[]```|optional|
|selectRowIfTargetIsNot|array|Array of CSS selector, which if matched will not select the row.|```[]```|optional|
|toggleOnClick|boolean|toggle selection on shift click|```false```|optional|
|filterSelection|function|callback to filter selected rows; doesn't filter, if `toggleOnClick` is `true`||optional|
|eventNs|string|event namespace|```uiSelectableRow```|optional|
|eventType.toggleSelection|string|name for custom event type, 'toggleSelection'|```toggle-selection```|optional|
|eventType.enable|string|name for custom event type, 'enable'|```enable```|optional|
|eventType.disable|string|name for custom event type, 'disable'|```disable```|optional|
|eventType.destroy|string|name for custom event type, 'destroy'|```destroy```|optional|
|eventType.destroyed|string|name for custom event type, 'destroyed'|```destroyed```|optional|
|eventType.shiftSelectable|string|name for custom event type, 'shiftSelectable'|```shift-selectable```|optional|
|eventType.ctrlSelectable|string|name for custom event type, 'ctrlSelectable'|```ctrl-selectable```|optional|
|dataAttr.rowIdentifier|string|name for custom data attribute, 'rowIdentifier'|```data-row-identifier```|optional|
|dataAttr.selectRowIfTargetIs|string|name for custom data attribute, 'selectRowIfTargetIs'|```data-select-row-if-target-is```|optional|
|dataAttr.selectRowIfTargetIsNot|string|name for custom data attribute, 'selectRowIfTargetIsNot'|```data-select-row-if-target-is-not```|optional|
|dataAttr.disabled|string|name for custom data attribute, 'disabled'|```data-disabled```|optional|
|dataAttr.shiftSelectable|string|name for custom data attribute, 'shiftSelectable'|```data-shift-selectable```|optional|
|dataAttr.ctrlSelectable|string|name for custom data attribute, 'ctrlSelectable'|```data-ctrl-selectable```|optional|
|dataAttr.selectedRowClass|string|name for custom data attribute, 'selectedRowClass'|```data-selected-class```|optional|
|isDisabled|boolean|enable/disable the plugin|```false```|optional|
|isShiftSelectable|boolean|enable/disable shift selectable|```true```|optional|
|isCtrlSelectable|boolean|enable/disable ctrl selectable|```true```|optional|
|selectedRowClass|string|name of the selected row class|```ui-selectable-row-selected```|optional|
|containerHoverClass|string|name of the hover class|```ui-selectable-row-hover```|optional|
|disableTextSelectionClass|string|name of the text selection disable class|```ui-selectable-row-disable-text-selection```|optional|

## Example(s)

build example by running the following command and navigate to `http://localhost:8080/example/index.html`;
ensure you run the example using a local server;

```sh
$ npm install
$ npm start
```

## License

MIT
