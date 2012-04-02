$('#mapPage').live('pageinit', function(event) {
	var controller = new CountriesController();
	
	addIosHeader();
	setInitialUiValues();
	controller.createMap('map_canvas', new google.maps.LatLng(45, 8));
	
	// year slider change event
	$("#yearSlider").bind("change", function(event, ui) {
		// only update ui if year changes
		if(event.currentTarget.value != controller.getYear()) {
			controller.setYear(event.currentTarget.value);
			$("#yearSliderValue").val(controller.getYear());
			if(controller.getLayer() && controller.getLayer().getMap()) {
				controller.getLayer().setMap(null);
				controller.updateLayer();
				controller.getLayer().setMap(controller.getMap());
			}
		}
		$("#yearSliderValue").css('left', $("#timeline a.ui-slider-handle").position().left);
		$("#yearSliderValueArrow").css('left', $("#timeline a.ui-slider-handle").position().left);
	});
	
	$("#typeSelection").change(function() {
		controller.setConditionType($('#typeSelection').val());
		if(controller.getConditionType() == 0 && controller.getLayer()) {
			controller.getLayer().setMap(null);
			$('#layerLegend').css('display', 'none');
		} else {
			$.fusiontable.where = '\'Indicator Code\' = \'' + controller.getConditionType() + '\'';
			if(!controller.getLayer()) {
				controller.createLayer();
			}
			controller.updateLayer();
			
			controller.getLayer().setMap(controller.getMap());
			$('#layerLegend').css('display', 'block');
		}
		
		// refresh map to avoid rendering bugs
		google.maps.event.trigger(controller.getMap(), 'resize');
	});
	
	function addIosHeader() {
		// add ios styles to head
		var iconRel = 'apple-touch-icon';
		if($.config.glossOnIcon !== undefined && !$.config.glossOnIcon) {
			iconRel = 'apple-touch-icon-precomposed';
		}
		if($.config.icon !== undefined) {
			var iconPhoneType = typeof($.config.icon.phone);
			if(iconPhoneType == 'object') {
				$('head').append('<link rel="' + iconRel + '" href="' + $.config.icon.phone[57] + '" />');
				$('head').append('<link rel="' + iconRel + '" sizes="72x72" href="' + $.config.icon.phone[72] + '" />');
				$('head').append('<link rel="' + iconRel + '" sizes="114x114" href="' + $.config.icon.phone[114] + '" />');
			} else if(iconPhoneType == 'string') {
				$('head').append('<link rel="' + iconRel + '" href="' + $.config.icon.phone + '" />');
			}
		}

		if($.config.startupScreen !== undefined && $.config.startupScreen.phone) {
			$('head').append('<link rel="apple-touch-startup-image" href="' + $.config.startupScreen.phone + '">');
		}
		var statusBarStyle = 'black';
		if($.config.statusBarStyle !== undefined) {
			statusBarStyle = $.config.statusBarStyle;
		}
		$('head').append('<meta name="apple-mobile-web-app-status-bar-style" content="' + statusBarStyle + '" />');
	}
	
	function setInitialUiValues() {
		// set intial values
		controller.setYear($.config.minYear);
		$("#yearSlider").attr("value", controller.getYear());
		$("#yearSlider").attr("min", controller.getYear());
		$("#yearSlider").attr("max", $.config.maxYear);
		$("#timeline a.ui-slider-handle").attr("title", controller.getYear());
		$("#yearSliderValue").val($("#yearSlider").val());
		// don't us disable() method to prevent jquery styling
		$("#yearSliderValue").attr("disabled", "disabled");
		
		// add legend entries
		$.each($.layerStyles, function(val, text) {
			if(text.polygonOptions) {
				var backgroundColor = hex2rgb(text.polygonOptions.fillColor, text.polygonOptions.fillOpacity);
				$('#layerLegend').prepend(
					'<dt class="' + text.id + '-color" style="background-color: ' + backgroundColor + '; border-color: ' + text.polygonOptions.strokeColor + ';"></dt>',
					'<dd class="' + text.id + '-text"></dd>'
				);
			}
		});
	}
	
	function addTypeOption(id, name) {
		$.types[id] = name;
			
		$('#typeSelection').append(
			$('<option></option>').val(id).html(name)
		);
	}
	
	var gftlib = new GftLib();
	var config = {
		table: $.fusiontable.id,
		fields: '\'' + $.fusiontable.typeField.id + '\', \'' + $.fusiontable.typeField.name + '\', COUNT()',
		condition: '\'' + $.fusiontable.typeField.id + '\' NOT EQUAL TO \'\'',
		groupby: '\'' + $.fusiontable.typeField.id + '\', \'' + $.fusiontable.typeField.name + '\''
	}
	var gftDataHandler = function(data) {
		var objs = gftlib.convertToObject(data);
		$.each(objs, function(val, text) {
			addTypeOption(text.indicatorcode, text.indicatorname);
		});
	}
	gftlib.execSelect(gftDataHandler, config);
});

$('#mapPage').live('pageshow', function() {
});