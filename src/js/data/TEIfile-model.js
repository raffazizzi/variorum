import * as Backbone from 'backbone';
import getHTML5 from '../utils/TEIditto.js';

class TEIfile extends Backbone.Model {
	initialize() {
		let data = $(this.get("data"))
		this.set("html5", getHTML5(data));

		// Set human readable label
		let label = ""
		if (data.find("publicationStmt idno[type=label]").length > 0) {
			label = data.find("publicationStmt idno[type=label]").text()
		}
		else {
			label = data.find("publicationStmt idno[type=local]").text()
		}
		this.set("label", label)
	}
}

export default TEIfile;
