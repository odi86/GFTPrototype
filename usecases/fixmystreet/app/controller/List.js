Ext.define("FixMyStreet.controller.List", {
	extend: "Ext.app.Controller",
	
	config: {
		refs: {
			problemList: '#problemList'
		},
		control: {
			problemList: {
				initialize: 'onProblemListInitialize'
			}
		}
	},
	
	onProblemListInitialize: function(listComp, eOpts) {
		console.log('init');
		this.getProblemList().setStore(this.getProblemStore());
	},
	
    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
    },
    init: function () {
        this.callParent(arguments);
		
		this.problemStore = Ext.getStore('Problems');
		this.problemStore.load();
    },
	
	getProblemStore: function() {
		return this.problemStore;
	},
	setProblemStore: function(problemStore) {
		this.problemStore = problemStore;
	}
});