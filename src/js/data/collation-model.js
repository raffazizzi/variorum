import * as Backbone from 'backbone';
import Variant from './variant-coll.js';

class Collation extends Backbone.Model {
	initialize() {
		let variants = [];
		let data = this.get("data");
        let TEIfiles = this.get("TEIfiles");

        let createReadingData = function(rdg){
						let data = {
                "source" : "",
								"label": "",
                "idref" : "",
                "elementRef" : null,
                "text" : "[missing]"
            }
            let $rdg = $(rdg);
            let source = $rdg.attr('wit').slice(1);
						data.source = source;
						let $ptr = $rdg.find("ptr");
						let source_data = $(TEIfiles.where({source: source})[0].get("html5"))
						if (source_data.find("tei-publicationStmt tei-idno[type=label]").length > 0) {
							data.label = source_data.find("tei-publicationStmt tei-idno[type=label]").text()
						}
						else {
								data.label = source_data.find("tei-publicationStmt tei-idno[type=local]").text()
						}
						if ($ptr.length > 0){
							let idref = $rdg.find("ptr").attr("target").split("#")[1];
							data.idref = idref;
							let elementRef = source_data.find('*[xml\\:id='+idref+']');
							data.elementRef = elementRef;
							let text = elementRef.text();
							// Check if this variant is part of supplied text, so that it can be showed in [ ]
							if (elementRef.closest("tei-supplied").length > 0){
								text = "["+text+"]"
							}
							data.text = text
						}

            return data;

        }

		$(data).find("app").each(function(i_a, app){

            // Create new variant collection
            let variant = new Variant();

            $(app).children().each(function(i_rg, reading){
								if (reading.tagName == "rdg") {
                    variant.add(createReadingData(reading))
                }
                else {
                    let toCreate = [];
                    $(reading).children().each(function(i_r, rdg){
                        toCreate.push(createReadingData(rdg));
                    });

                    for (let r of toCreate) {
                        r["group"] = $(reading).attr("n");
                        variant.add(r);
                    }
                }
            });

            variants.push(variant);

        });

        this.set("variants", variants);
	}
}

export default Collation;
