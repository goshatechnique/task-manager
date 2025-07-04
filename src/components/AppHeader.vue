<template>
	<div class="header">
		<router-link to="/" class="header-nav">
			<span>Home</span>
		</router-link>
		<router-link to="/about" class="header-nav">
			<span>About</span>
		</router-link>
	</div>
</template>

<script>
export default {
	name: "AppHeader",
};
</script>

<style lang="scss" scoped>
.header {
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	&-nav {
		color: #4b5563;
		font-size: 1.2em;
		text-decoration: none;
		padding: 0px 5px;
	}
}

.active-link {
	text-decoration: underline;
}

.exact-active-link {
	text-decoration: underline;
}
</style>
