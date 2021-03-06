<?php
/**
 * Laravel - A clean and classy framework for PHP web development.
 *
 * @package  Laravel
 * @version  1.5.9
 * @author   Taylor Otwell
 * @link     http://laravel.com
 */

$_SERVER['LARAVEL_ENV'] = 'production';

// --------------------------------------------------------------
// The path to the application directory.
// --------------------------------------------------------------
$application = '../application';

// --------------------------------------------------------------
// The path to the system directory.
// --------------------------------------------------------------
$system      = '../../laravel-mywizz/system';

// --------------------------------------------------------------
// The path to the packages directory.
// --------------------------------------------------------------
$packages    = '../packages';

// --------------------------------------------------------------
// The path to the modules directory.
// --------------------------------------------------------------
$modules     = '../modules';

// --------------------------------------------------------------
// The path to the storage directory.
// --------------------------------------------------------------
$storage     = '../storage';

// --------------------------------------------------------------
// The path to the public directory.
// --------------------------------------------------------------
$public      = __DIR__;

// --------------------------------------------------------------
// The shared libraries path
// --------------------------------------------------------------
$shared_libraries = '../../laravel-shared/libraries';

// --------------------------------------------------------------
// The shared packages path
// --------------------------------------------------------------
$shared_packages = '../../laravel-shared/packages';

// --------------------------------------------------------------
// Launch Laravel.
// --------------------------------------------------------------
require $system.'/laravel.php';