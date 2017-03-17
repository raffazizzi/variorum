import * as Handlebars from 'handlebars';

let TEIfiles_tpl = `
{{#each . }}
<li {{#if this.selected}}class="active"{{/if}}><a href="#source/{{source}}">{{label}}</a></li>
{{/each}}`

export default Handlebars.compile(TEIfiles_tpl);
