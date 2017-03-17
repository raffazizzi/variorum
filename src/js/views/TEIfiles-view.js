import $ from 'jquery';
import * as Backbone from 'backbone';
import TEIfiles_tpl from '../templates/TEIfiles-tpl.js';
import TEIfiles_mus_tpl from '../templates/TEIfiles-mus-tpl.js';

class TEIfilesView extends Backbone.View {
    initialize(options){
        this.selected = options.selected;
    }
    render(){
        let lit_ms = []
        let lit_p = []
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
            else if ($mei.find("tei-msDesc").length > 0) {
              lit_ms.push(model.toJSON())
            }
            else {
              lit_p.push(model.toJSON())
            }
        });

        // Group musical sources by their idno
        let grouped_mus = [...mus.reduce((hash, { idno, data }) => {
          const current = hash.get(idno) || { idno, data: [] };
          current.data.push(data);

          return hash.set(idno, current);
        }, new Map).values()];

        this.$el.find("#lit_ms").html(TEIfiles_tpl(lit_ms));
        this.$el.find("#lit_p").html(TEIfiles_tpl(lit_p));
        this.$el.find("#mus").html(TEIfiles_mus_tpl(grouped_mus));
    }
}

export default TEIfilesView;
