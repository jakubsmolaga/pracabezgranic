<?php

if ( $_POST['payload'] ) {
shell_exec( ‘cd /usr/share/nginx/pracabezgranic/ && git reset –hard HEAD && git pull’ );
}

?>hi
