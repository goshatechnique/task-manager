<template>
	<div class="footer">
		<div class="footer__divider" />
		<span class="footer__title">Smart Task Manager (c) 2025. Vue.</span>
	</div>
</template>

<script>
export default {
	name: "AppFooter",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.footer {
	height: 50px;
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	&__divider {
		width: 900px;
		height: 1px;
	}
	&__title {
		padding-top: 10px;
	}
}
</style>
