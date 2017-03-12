import $ from 'jquery';
import * as Backbone from 'backbone';
import TEIfiles_tpl from '../templates/TEIfiles-tpl.js';
import TEIfiles_mus_tpl from '../templates/TEIfiles-mus-tpl.js';

class TEIfilesView extends Backbone.View {
    initialize(options){
        this.selected = options.selected;
    }
    render(){
        let lit = []
        let mus = []
        this.collection.each((model) => {
            if (model.get("source") == this.selected){
                model.set("selected", true);
            }
            else model.set("selected", false);
            let $mei = $(model.get("html5"));
            if ($mei.find("tei-bibl[type=music]").length > 0) {
              mus.push({idno: $mei.find("tei-publicationStmt tei-idno").text(), data: model.toJSON()})
            }
            else {
              lit.push(model.toJSON())
            }
        });

        // Group musical sources by their idno
        let grouped_mus = [...mus.reduce((hash, { idno, data }) => {
          const current = hash.get(idno) || { idno, data: [] };
          current.data.push(data);

          return hash.set(idno, current);
        }, new Map).values()];

        this.$el.find("#lit").html(TEIfiles_tpl(lit));
        this.$el.find("#mus").html(TEIfiles_mus_tpl(grouped_mus));
    }
}

export default TEIfilesView;
