import $ from 'jquery';
import * as Backbone from 'backbone';
import reading_tpl from '../templates/reading-tpl.js';

class ReadingView extends Backbone.View {
	initialize(options){
		this.source = options.source;
		this.$textEl = this.collection.where({"source":this.source})[0].get("elementRef");
		if (this.$textEl){
			this.$textEl.click((e)=>{
				e.preventDefault();
				this.showInfo()});
			// this.$textEl.hover((e)=>{e.preventDefault(); this.showInfo()});
		}
	}

	showInfo() {
		// When rendering, only send to template variants that are OTHER than this.source.
    	// Also set a flag that says whether other readings ( .get("agreeing") ) agree with this.source.

    	$(".variant").removeClass('active');
    	this.$textEl.addClass('active');

    	this.collection.each((rdg)=>{
    		if (rdg.get("group")){

					let this_source = rdg
					let agreeing = [];

					this.collection.each((r)=>{
						if (r.get("group") && r.get("group") == this_source.get("group") &&
						    r.get("source") != this_source.get("source")) {
							agreeing.push(r.get("source"))
						}
					});

					rdg.set("agreeing", agreeing)

    		}
    	});

    	let readings = this.collection
    		.chain()
	        .filter((rdg) => {
	            return rdg.get("source") !== this.source;
	        })
	        .invoke('toJSON')
	        .value();

    	this.$el.html(reading_tpl(readings));
	}

    render(){
    	$(".variant").removeClass('active');
			if (this.$textEl) this.$textEl.addClass('variant');
    }
}

export default ReadingView;
