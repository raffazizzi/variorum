import * as Handlebars from 'handlebars';

Handlebars.registerHelper('list', function(context, options) {
  return context.map(function(item) {
    return options.fn(item);
  }).join(", ");
});

let reading_tpl = `
{{#each .}}
<div>
	<p><a href="#/source/{{this.source}}">{{this.label}}</a></p>
	{{#if this.agrees}}<p><span class="agrees">agrees with displayed</span></p>{{/if}}
	{{#if this.agreeing}}agrees with
		{{#list this.agreeing}}{{this}}{{/list}}
	{{/if}}
	<p class="variant_text">{{this.text}}</p>
	<hr/>
</div>
{{/each}}`

export default Handlebars.compile(reading_tpl);
