Ext.define("FixMyStreet.controller.ReportMap", {
	extend: "FixMyStreet.controller.Map",
	
	config: {
		views: [
			'report.ReportContainer'
		],
		refs: {
			reportMap: '#reportMap',
			addressTextField: 'textfield[name=address]',
			typeSelectField: '#typeSelectField',
			reportButton: '#reportButton',
			reportCurrentLocationButton: '#reportCurrentLocationButton'
		},
		control: {
			reportMap: {
				maprender: 'onMapRender'
			},
			typeSelectField: {
				change: 'onTypeChange'
			},
			reportButton: {
				tap: 'onReportButtonTap'
			},
			reportCurrentLocationButton: {
				tap: 'onCurrentLocationButtonTap'
			}
		}
	},
	
	onMapRender: function(mapComp, map, eOpts) {
		var me = this;
        me.callParent(arguments);
		
		var latlng = this.getCurrentLocationLatLng(mapComp);
		
		if(mapComp.getGeo() && !mapComp.getGeo().isAvailable()) {
			// if geolocation isn't available
			map.setZoom(FixMyStreet.util.Config.getMap().defaultZoom);
			me.getReportCurrentLocationButton().setDisabled(true);
		}
		
		// geocode current position and update current address
		me.geocodePosition(latlng);
		
		// add problem marker to map
		me.addProblemMarker(latlng, map);
    },
	
	addProblemMarker: function(latlng, map) {
		var me = this;
		
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			draggable: true,
			animation: google.maps.Animation.DROP,
			icon: me.getProblemMarkerImagesById('undefined'),
			shadow: me.getMarkerShadow(),
			// do not optimize marker image to recieve retina display support
			optimized: false
		});
		
		google.maps.event.addListener(marker, 'dragend', function() {
			me.geocodePosition(marker.getPosition());
		});
		
		me.setProblemMarker(marker);
	},
	
	onTypeChange: function(field, newValue, oldValue, eOpts) {
		var me = this;
		
		if(field.getValue() == 'undefined') {
			me.getReportButton().setDisabled(true);
		} else {
			me.getReportButton().setDisabled(false);
		}
		
		// change marker icon
		var markerIcon = me.getProblemMarkerImagesById(field.getValue());
		me.getProblemMarker().setIcon(markerIcon);
	},
	
	geocodePosition: function(latlng) {
		var me = this;
		if(!this.disableGeocoding) {
			this.getGeocoder().geocode({'latLng': latlng}, function(results, status) {
				if(status == google.maps.GeocoderStatus.OK) {
					if(results[0]) {
						me.updateCurrentAddress(results[0].formatted_address);
					}
				}
			});
		} else {
			me.updateCurrentAddress(latlng);
		}
	},
	
	updateCurrentAddress: function(address) {
		this.setCurrentAddress(address);
		this.getAddressTextField().setValue(address);
	},
	
	onReportButtonTap: function(button, e, eOpts) {
		var me = this;
		var timestamp = new Timestamp();
		this.setTimestamp(timestamp);
		Ext.Msg.confirm('Defekt melden', '<p>' + me.getTypeSelectField().getComponent().getValue() + ' wirklich melden?</p><p>Gewählte Adresse: ' + me.getAddressTextField().getValue() + '</p>', me.handleReportButtonConfirmResponse, me);		
	},
	
	handleReportButtonConfirmResponse: function(buttonId, value, opt) {
		var me = this;
		if(buttonId == 'yes') {
			try {
				// creating problem instance
				var status = Ext.getStore('Status').getById('new');
				var type = Ext.getStore('Types').getById(me.getTypeSelectField().getValue());
				
				if(status && type) {
					/*var problem = new FixMyStreet.model.Problem();
					problem.setData(
						{
							rowid: rowid,
							timestamp: me.getTimestamp().getTimestamp(),
							address: me.getCurrentAddress(),
							latitude: me.getProblemMarker().getPosition().lat(),
							longitude: me.getProblemMarker().getPosition().lng(),
							// @TODO why do I have to add getData() instead of record
							type: type.getData(),
							status: status.getData()
						}
					);

					// adding problem to store
					me.getProblemStore().add(problem);
					*/
				   
					var newProblem = Ext.create('FixMyStreet.model.Problem', {
						timestamp: me.getTimestamp().getTimestamp(),
						address: me.getCurrentAddress(),
						latitude: me.getProblemMarker().getPosition().lat(),
						longitude: me.getProblemMarker().getPosition().lng(),
						// @TODO why do I have to add getData() instead of record
						type: type.getData(),
						status: status.getData()
					});

					console.log(newProblem);
					// adding problem to store
					newProblem.save();
				}
				
				// resetting view data
				me.resetView();
			} catch(err) {
				console.log(err);
			}
		}
	},
	
	resetView: function() {
		this.getReportButton().setDisabled(true);
		this.getTypeSelectField().setValue('undefined');
		
		// get current position
		var latlng = this.getCurrentLocationLatLng(this.getReportMap());
		
		this.getReportMap().setMapCenter(latlng);
		this.getProblemMarker().setPosition(latlng);
		this.geocodePosition(latlng);
		this.setTimestamp(null);
	},
	
	onCurrentLocationButtonTap: function(button, e, eOpts) {
		var me = this;
		var mapComp = me.getReportMap();
		
		var latlng = me.getCurrentLocationLatLng(mapComp);
		mapComp.setMapCenter(latlng);
		me.getProblemMarker().setPosition(latlng);
		me.geocodePosition(latlng);
	},
	
	// -------------------------------------------------------
    // Base Class functions
	// -------------------------------------------------------
    launch: function () {
        this.callParent(arguments);
    },
    init: function () {
		var me = this;
        me.callParent(arguments);
		
		me.problemStore = Ext.getStore('Problems');
		me.problemMarker = null;
		me.geocoder = new google.maps.Geocoder();
		me.currentAddress = null;
		me.timestamp = null;
		
		// @TODO remove debug code
		me.disableGeocoding = false;
    },
	
	getProblemStore: function() {
		return this.problemStore;
	},
	setProblemStore: function(problemStore) {
		this.problemStore = problemStore;
	},
	getProblemMarker: function() {
		return this.problemMarker;
	},
	setProblemMarker: function(problemMarker) {
		this.problemMarker = problemMarker;
	},
	getGeocoder: function() {
		return this.geocoder;
	},
	setGeocoder: function(geocoder) {
		this.geocoder = geocoder;
	},
	getCurrentAddress: function() {
		return this.currentAddress;
	},
	setCurrentAddress: function(currentAddress) {
		this.currentAddress = currentAddress;
	},
	getTimestamp: function() {
		return this.timestamp;
	},
	setTimestamp: function(timestamp) {
		this.timestamp = timestamp;
	}
});