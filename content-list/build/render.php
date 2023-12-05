<?php

$blockTitle = esc_html($attributes['blockTitle']);
$per_page = esc_html($attributes['perPage']);
$order_by = esc_html($attributes['orderBy']);
$order = esc_html($attributes['order']);
$excluded_posts = $attributes['excludedPosts'];
$post_types = $attributes['postTypes'];
$paged = get_query_var('paged') ? get_query_var('paged') : 1;;

$args = array(
    'post_type' => $post_types,
    'posts_per_page' => $per_page,
	'paged' => $paged,
	'orderby' => $order_by,
	'order' => $order,
	'post__not_in ' => $excluded_posts,
);

$query = new WP_Query( $args );

$total_posts = $query->found_posts;
$max_pages = ceil( $total_posts / $per_page );  

?>
<div <?php echo get_block_wrapper_attributes(); ?> class="yk-content-list-ui">
	<h3 class="block-title"><?= $blockTitle; ?></h3>

	<ul>

		<?php 
		
		while($query->have_posts()):
			$query->the_post();
		?>
		<li>
			<a href="<?= the_permalink(); ?>"><?= the_title(); ?></a>
		</li>
		<?php 
			endwhile;		
			wp_reset_postdata(); 
		?>
	</ul>

	<?php 
	
	if($total_posts > $per_page):
		echo paginate_links(array(
			'base' => get_pagenum_link(1) . '%_%',
			'format' => '?paged=%#%',
			'current' => $paged,
			'total' => $max_pages,
			'prev_text'    => __('« prev'),
			'next_text'    => __('next »'),
		));

	endif;	
	?>

	<p>Showing <?= $per_page; ?> out of <?= $total_posts; ?> items.</p>

</div>
