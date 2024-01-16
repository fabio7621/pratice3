let productModal = null;
let delProductModal = null;
const App = {
	data() {
		return {
			apiUrl: "https://vue3-course-api.hexschool.io/v2",
			apiPath: "fabio20",
			products: [],
			catchProduct: {
				imgUrl: [],
			},
			isNew: false,
		};
	},
	mounted() {
		productModal = new bootstrap.Modal(document.getElementById("productModal"));

		delProductModal = new bootstrap.Modal(
			document.getElementById("delProductModal")
		);

		const token = document.cookie.replace(
			/(?:(?:^|.*;\s*)fabio20token\s*=\s*([^;]*).*$)|^.*$/,
			"$1"
		);
		axios.defaults.headers.common.Authorization = token;

		this.checklogin();
	},
	methods: {
		checklogin() {
			axios
				.post(`${this.apiUrl}/api/user/check`)
				.then(() => {
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
					window.location = "login.html";
				});
		},
		getData() {
			axios
				.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
				.then((res) => {
					this.products = res.data.products;
				})
				.catch((err) => {
					alert("找不到資訊");
				});
		},
		openModal(isNew, item) {
			if (isNew === "new") {
				this.catchProduct = {
					imagesUrl: [],
				};
				this.isNew = true;
				productModal.show();
			} else if (isNew === "edit") {
				this.catchProduct = { ...item };
				this.isNew = false;
				productModal.show();
			} else if (isNew === "delete") {
				this.catchProduct = { ...item };
				delProductModal.show();
			}
		},
	},
};
Vue.createApp(App).mount("#app");
