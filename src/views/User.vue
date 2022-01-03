<template>
	<div class="container">
		<div class="left">
			<div id="title">
				<i class="el-icon-user"></i>
				<div id="nickName">
					{{user.nickName}}
				</div>
			</div>
			<div id="honor">
				
			</div>
			<div id="editB">
				<el-button type="success" plain>编辑个人资料</el-button>
			</div>
			<div id="joinTime"  v-if="user.registrationTime">
				{{user.registrationTime.split("T")[0]}}	加入
			</div>
		</div>
		<div class="right">
			<div class="basic">
				<div id="intro">
					<div>
						个人简介
					</div>
					<div>
						这个人太懒了，还没有简介
					</div>
				</div>
				<div id="tech">
					<div>
						技术栈
						<i class="el-icon-circle-plus-outline" @click="addTec"></i>
					</div>
					<ul>
						<li v-for="item in techList" :key="item.id" :style="{'border-color': colorList[item.id % 5]}">
							{{ item.name }}
							<i class="el-icon-close" @click="subTec"></i>
						</li>
					</ul>
				</div>
			</div>
			<div class="post">
				<template>
					<el-backtop target=".post" :right="330"></el-backtop>
				</template>
				<ul class="infinite-list" v-infinite-scroll="load">
					<li v-for="item in user.posts.slice(0, count)" :key="item.id" class="infinite-list-item">{{ item.title }}</li>
				</ul>
				<p v-if="noMore">没有更多了</p>
			</div>
		</div>
	</div>
</template>

<script>
const axios = require('axios').default;

export default {
	name: "User",
	created() {
		this.getData();
	},
	data() {
		return {
			user: {},
			techList: [],
			colorList: ["pink", "orange", "skyblue", "gray", "lightgreen"],
			count: 0,
		}
	},
	computed: {
		noMore () {
			return this.count >= this.user.posts.length;
		},
	},
	methods: {
		async getData() {
			let user = (await axios.get("/api/v1/me")).data.data;
			user.tech = (await axios.get("/api/v1/techs/" + user.id)).data.data;
			user.posts = (await axios.get("/api/v1/posts", {
				params: {
					userId: user.id
				}
			})).data.data;
			this.techList = (await axios.get("/api/v1/techs")).data.data;
			this.user = user;
		},
		load () {
			if (this.count < this.user.posts.length) {
				this.count ++;
			}
		},
		addTec() {

		},
		subTec() {

		},
	}
}
</script>

<style scoped>
.container {
	height: 100vh;
	display: flex;
	justify-content: center;
	background-color: #e9ecef;
}

.left, .basic, .post {
	border-radius: 10px;
	margin-top: 50px;
	background-color: white;
	padding: 15px;
}

.left {
	width: 280px;
	height: 580px;
}

.right {
	width: 800px;
	margin-left: 30px;
}

.basic {
	display: flex;
	align-items: flex-start;
	height: 160px;
}

#intro {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}

#intro > div {
	width: 400px;
}

#tech > ul {
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	padding: 0;
}

#tech > ul > li {
	font-size: 18px;
	margin: 5px 10px;
	text-align: center;
	border-radius: 50%;
	padding: 5px;
	border: 2px solid;
	color: gray;
}

#tech > ul > li:hover {
	color: black;
}

#tech i {
	cursor: pointer;
}

.left > div {
	display: flex;
	justify-content: center;
	align-items: center;
}

#title {
	height: 280px;
	flex-direction: column;
}

#title > i {
	border: 5px black solid;
	border-radius: 50%;
	font-size: 120px;
}

#nickName {
	font-size: 32px;
	font-weight: bold;
	margin-top: 20px;
}

#honor {
	background-color: pink;
	height: 130px;
}

#editB {
	height: 130px;
}

#editB > .el-button {
	font-size: 18px;
	width: 200px;
}

#joinTime {
	color: gray;
	justify-content: start;
	align-items: flex-end;
}

.post {
	margin-top: 20px;
	height: 650px;
	overflow: auto;
}

.post li {
	height: 400px;
}
</style>