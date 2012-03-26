/*
 * File: app/controller/Map.js
 *
 * This file was generated by Sencha Designer version 2.0.0.
 * http://www.sencha.com/products/designer/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Designer does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.controller.Map', {
    extend: 'Ext.app.Controller',

    config: {
        stores: [
            'FusionTablesStore'
        ],
        views: [
            'Viewport'
        ],
        refs: {
            gftmap: '#gftmap'
        },

        control: {
            "sliderfield": {
                change: 'onSliderfieldChange'
            },
            "checkboxfield": {
                check: 'onCheckboxfieldCheck',
                uncheck: 'onCheckboxfieldUncheck'
            },
            "togglefield": {
                change: 'onTogglefieldChange'
            }
        }
    },

    init: function() {
        this.layers = [];
    },

    onSliderfieldChange: function(slider, thumb, newValue, oldValue, options) {
        var tableId = 2741123;

        if(this.layers[tableId]) {
            var tableData = Ext.getStore('FusionTablesStore').getById(tableId);
            tableData.data.condition = 'population > ' + newValue;

            this.layers[tableId].setOptions({
                query: {
                    select: tableData.data.locationField,
                    from: tableData.data.id,
                    where: tableData.data.condition
                }
            });
        }
    },

    onCheckboxfieldCheck: function(checkboxfield, e, options) {
        var tableId = checkboxfield.getName();
        var tableData = Ext.getStore('FusionTablesStore').getById(tableId);

        if(!this.layers[tableId]) {
            this.createLayer(tableData);
        }

        this.layers[tableId].setMap(this.getGftmap().getMap());
    },

    onCheckboxfieldUncheck: function(checkboxfield, e, options) {
        var tableId = checkboxfield.getName();

        if(this.layers[tableId]) {
            this.layers[tableId].setMap(null);
        }
    },

    onTogglefieldChange: function(slider, thumb, newValue, oldValue, options) {
        var tableId = slider.getName();
        var tableData = Ext.getStore('FusionTablesStore').getById(tableId);

        // if togglefield activated
        if(newValue) {
            if(!this.layers[tableId]) {
                this.createLayer(tableData);
            }
            this.layers[tableId].setMap(this.getGftmap().getMap());
        } else {
            if(this.layers[tableId]) {
                this.layers[tableId].setMap(null);
            }
        }


    },

    createLayer: function(tableData) {
        var layer = new google.maps.FusionTablesLayer({
            query: {
                select: tableData.data.locationField,
                from: tableData.data.id,
                where: tableData.data.condition
            },
            styles: tableData.data.styles
        });

        this.layers[tableData.data.id] = layer;
    }

});