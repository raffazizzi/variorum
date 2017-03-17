import * as Handlebars from 'handlebars';

let TEIfiles_mus_tpl = `
{{#each . }}
    <li>
    <a href="#sm{{@index}}" data-toggle="collapse"">{{this.idno}} <span class="glyphicon glyphicon-chevron-right"></span></a>
    <ul class="nav nav-sidebar collapse" id="sm{{@index}}">
    {{#each this.data }}
      <li {{#if this.selected}}class="active"{{/if}} id="nav_{{this.label}}"><a class="indent" href="#source/{{this.label}}">{{this.label}}</a></li>
    {{/each}}
    </ul>
    </li>
{{/each}}`

export default Handlebars.compile(TEIfiles_mus_tpl);
