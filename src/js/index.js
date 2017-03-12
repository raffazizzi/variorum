import $ from 'jquery';
import Variorum from './routers/variorum.js';
import Backbone from 'backbone';

class Application {

    constructor () {
        let baseDir = 'data/';
	    new Variorum(
	    	{"files" : [baseDir+'E2.xml', baseDir+'E3.xml', baseDir+'Solerti71.xml', baseDir+'Trm0319a-Canto.xml', baseDir+'Trm0319a-Basso.xml'],
	    	"collation" : baseDir+'collation.xml'}
	    );

    }

}

$(() => {
    new Application();
});
