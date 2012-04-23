<?php

// Configurion examples
$examplesArr = Array(
	'js' => Array(
		'data-print' => Array(
			'title' => 'Select data',
			'tags' => Array(
				'sqlapi'
			)
		),
		'spatialquery-condition' => Array(
			'title' => 'Select data with a spatial condition',
			'tags' => Array(
				'sqlapi'
			)
		),
		'spatialquery-order' => Array(
			'title' => 'Select data with a spatial condition in order clause',
			'tags' => Array(
				'sqlapi'
			)
		),
		'gmap-rawdata' => Array(
			'title' => 'Show raw data',
			'tags' => Array(
				'gmap'
			)
		),
		'gmap-geocoding' => Array(
			'title' => 'Show raw data with geocoding',
			'tags' => Array(
				'gmap',
				'sqlapi'
			)
		),
		'gmap-fusiontableslayer' => Array(
			'title' => 'FusionTablesLayer',
			'tags' => Array(
				'gmap',
				'fusiontableslayer'
			)
		),
		'gmap-dynamic-fusiontableslayer' => Array(
			'title' => 'Dynamic FusionTablesLayer',
			'tags' => Array(
				'gmap',
				'fusiontableslayer'
			)
		),
		'gmap-spatialquery' => Array(
			'title' => 'Google Maps with Spatial condition',
			'tags' => Array(
				'gmap',
				'fusiontableslayer'
			)
		),
		'gchart-fusiontable' => Array(
			'title' => 'Google Chart Tool with Fusion Table data',
			'tags' => Array(
				'gchart'
			)
		),
		'oauth-login' => Array(
			'title' => 'Inserting data to Fusion Table with OAuth',
			'tags' => Array(
				'oauth'
			)
		),
		'senchatouch-fusiontableslayer' => Array(
			'title' => 'FusionTablesLayer used in Sencha Touch 2 Application',
			'tags' => Array(
				'gmap',
				'fusiontableslayer',
				'st2'
			)
		)
	)
);

$labelTitleMapping = Array(
	'fusiontableslayer' => 'Google Maps FusionTablesLayer',
	'gmap' => 'Google Maps API',
	'sqlapi' => 'Google Fusion Tables SQL API',
	'oauth' => 'OAuth 2',
	'gchart' => 'Google Chart Tool',
	'st2' => 'Sencha Touch 2.0',
	'jqm' => 'jQuery Mobile',
);
$labelColorMapping = Array(
	'fusiontableslayer' => 'info',
	'gmap' => 'important',
	'sqlapi' => 'success',
	'oauth' => 'warning',
	'gchart' => 'default',
	'st2' => 'default',
	'jqm' => 'default',
);
?>

<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>GFTPrototype</title>
	<link rel="icon" href="./resources/images/gftprototype-favicon.png" type="image/png" />

	<!-- twitter bootstrap -->
	<link href="./lib/bootstrap-2.0.2/css/bootstrap.css" rel="stylesheet">
	
	<link rel="stylesheet" href="./resources/styles/styles.css" type="text/css">
</head>
<body>
	<h1 class="page-header">GFTPrototype</h1>
	<div id="box">
		
		<h2 class="first">Examples</h2>
		<h3>JavaScript</h3>
		<ul id="examples">
		<?php
			$counter = 0;
			foreach($examplesArr['js'] as $exampleJsKey => $examplesJsValue) {
				if($counter % 2) {
					$content = '<li>';
				} else {
					$content = '<li class="odd">';
				}
				$content .= '<div class="title"><a href="./examples/js/'. $exampleJsKey.'">'.$examplesJsValue['title'].'</a></div>';
				foreach($examplesJsValue['tags'] as $examplesJsTagValue) {
					$content .= '<span class="label label-'.$labelColorMapping[$examplesJsTagValue].'">'.$labelTitleMapping[$examplesJsTagValue].'</span>';
				}
				$content .= '</li>';
				echo $content;
				++$counter;
			}
		?>
		</ul>
		<h3>Diverses</h3>
		<ul id="examples">
			<li class="odd"><a href="http://jenkins.rdmr.ch:8080/job/Import%20GIS%20files%20to%20GFT/">Geodaten Converter</a> (nur mit Login ausführbar)</li>
		</ul>
		
		<h2>UseCases</h2>
		<h3>WorldData</h3>
		<div class="part-body">
			<dl class="description">
				<dt>Beschreibung:</dt>
				<dd>WorldData zeigt grosse Datenmengen aus einer FusionTable via FusionTablesLayer der Google Maps API an.</dd>
				<dt>Techonologie:</dt>
				<dd>JavaScript (jQuery Mobile verwendet), HTML</dd>
				<dt>Labels:</dt>
				<dd><span class="label label-normal">jQuery Mobile</span><span class="label label-info">Google Maps FusionTablesLayer</span><span class="label label-important">Google Maps API</span></dd>
				<dt>Voraussetzungen:</dt>
				<dd>Diese Applikation läuft auf allen gängigen Browsern. Eine vollständige Liste mit den unterstützten Browsern findet man hier: <a href="http://jquerymobile.com/gbs/" target="_blank">jQuery Mobile Supported Platforms</a></dd>
			</dl>
			<p class="app-start">
				<a href="./usecases/worlddata" class="btn btn-primary">Applikation jetzt starten</a>
			</p>
		</div>
		
		<h3>FixMyStreet</h3>
		<div class="part-body">
			<dl class="description">
				<dt>Beschreibung:</dt>
				<dd>Mit FixMyStreet können Bürger Defekte (Strassenlampen, Schlaglöcher, etc.) per Handy an ihre Gemeinde melden.</dd>
				<dt>Techonologie:</dt>
				<dd>JavaScript (Sencha Touch 2.0 verwendet)</dd>
				<dt>Labels:</dt>
				<dd><span class="label label-normal">Sencha Touch 2.0</span><span class="label label-info">Google Maps FusionTablesLayer</span><span class="label label-important">Google Maps API</span></dd>
				<dt>Voraussetzungen:</dt>
				<dd>Diese Applikation läuft auf allen WebKit-Browsern (Desktop: Chrome, Opera, Safari / Mobile: iOS, Android, Blackberry)</dd>
			</dl>
			<p class="app-start">
				<a href="./usecases/fixmystreet" class="btn btn-primary">Applikation jetzt starten</a>
				<a href="./usecases/fixmystreet/index_iphone.html" class="btn btn-info">iPhone Preview jetzt starten</a>
			</p>
		</div>
		
		<h2>Über das Projekt</h2>
		<div class="part-body">
			<dl class="description">
				<dt>Projekt:</dt>
				<dd>Studienarbeit FS2012</dd>
				<dt>Schule:</dt>
				<dd><a href="http://www.hsr.ch/" target="_blank">HSR Hochschule für Technik Rapperswil</a></dd>
				<dt>Autoren:</dt>
				<dd>Stefan Oderbolz</dd>
				<dd>Jürg Hunziker</dd>
				<dt>Betreuer:</dt>
				<dd>Stefan Keller</dd>
				<dt>Auftraggeber:</dt>
				<dd>Marco Lehmann, <a href="http://www.geoinfo.ch/" target="_blank">GEOINFO AG Herisau</a></dd>
				<dt>Repository:</dt>
				<dd><a href="https://github.com/odi86/GFTPrototype" target="_blank">https://github.com/odi86/GFTPrototype</a></dd>
				<dt>Projektmanagement:</dt>
				<dd><a href="http://redmine.rdmr.ch/redmine/projects/gftprototype" target="_blank">http://redmine.rdmr.ch/redmine/projects/gftprototype</a></dd>
				<dt>Continuous Integration:</dt>
				<dd><a href="http://jenkins.rdmr.ch:8080/job/GFTPrototype/" target="_blank">http://jenkins.rdmr.ch:8080/job/GFTPrototype/</a></dd>
				
			</dl>
		</div>
	</div>
</body>
</html>
