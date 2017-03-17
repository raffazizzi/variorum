import $ from 'jquery';
import * as Backbone from 'backbone';
import TEImetdata_tpl from '../templates/TEImetadata-tpl.js';

class TEIfileView extends Backbone.View {
    render(){
    	let raw_data = $(this.model.get("data"));
    	let title = raw_data.find("titleStmt").find('title').text();
    	let metadata = {"title":title}

    	//MS metadata
        if (raw_data.find("msDesc").get(0)){
            metadata["ms"] = {};
        	metadata["ms"]["region"] = raw_data.find('region').text();
        	metadata["ms"]["settlement"] =  raw_data.find('settlement').text();
        	metadata["ms"]["repository"] =  raw_data.find('repository').text();
        	metadata["ms"]["idno"] = raw_data.find('msIdentifier idno').text();
        	metadata["ms"]["origDate"] = raw_data.find('origDate').text();
          metadata["ms"]["locus"] = raw_data.find('locus').text();
        }

    	//Print metadata
    	if (raw_data.find("bibl").get(0)){
            metadata["print"] = {};
    		raw_data.find("bibl").children().each(function(i, md){
	    		metadata["print"][md.tagName] = $(md).text();
	    	});
    	}

    	this.$el.html(TEImetdata_tpl(metadata));
        this.$el.append(this.model.get('html5'));
    }
}

export default TEIfileView;
