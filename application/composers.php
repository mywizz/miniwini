<?php

return array(

	/*
	|--------------------------------------------------------------------------
	| View Names & Composers
	|--------------------------------------------------------------------------
	|
	| Named views give you beautiful syntax when working with your views.
	|
	| Here's how to define a named view:
	|
	|		'home.index' => array('name' => 'home')
	|
	| Now, you can create an instance of that view using the expressive View::of
	| dynamic method. Take a look at this example:
	|
	|		return View::of_layout();
	|
	| View composers provide a convenient way to add common elements to a view
	| each time it is created. For example, you may wish to bind a header and
	| footer partial each time the view is created.
	|
	| The composer will receive an instance of the view being created, and is
	| free to modify the view however you wish. Here is how to define one:
	|
	|		'home.index' => function($view)
	|		{
	|			//
	|		}
	|
	| Of course, you may define a view name and a composer for a single view:
	|
	|		'home.index' => array('name' => 'home', function($view)
	|		{
	|			//
	|		})	
	|
	*/

	'layouts.front' => array('name' => 'front', function($view)
	{
		if ($_SERVER['LARAVEL_ENV'] == 'production')
		{
			Asset::add('css1', 'css/reset.css');
			Asset::add('css2', 'css/base.css');
			Asset::add('css3', 'css/layout.css');
			Asset::add('css4', 'css/commently.css');
			Asset::add('css5', 'css/board.css');
		}
		else
		{
			Asset::add('css', 'css/miniwini.css');
		}
		
		Asset::add('jquery', 'javascripts/jquery.js');
		Asset::add('miniwini', 'javascripts/miniwini.js');
		Asset::add('commently', 'javascripts/commently.js');

		
		return $view;
	}),

);