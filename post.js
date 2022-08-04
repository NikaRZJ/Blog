(() => {

	//получение данных
	async function getData(id) {
		const response = await fetch(`https://gorest.co.in/public-api/posts/${id}`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer dea5147011a70557e807a29cd88bf8127ca1d65f5f200745c16d6ce4e56d0c5e',
				'Content-Type': 'application/json'
			},
		})
		const data = await response.json();
		return data;
	}

	//получение данных
	async function getComments(id) {
		const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer dea5147011a70557e807a29cd88bf8127ca1d65f5f200745c16d6ce4e56d0c5e',
				'Content-Type': 'application/json'
			},
		})
		const data = await response.json();
		return data;
	}

	function createComments(author, comment, email) {
		const item = document.createElement('div');
		item.classList.add('list-group-item');
		// item.setAttribute('aria-current', 'true');
		const itemWrapper = document.createElement('div');
		itemWrapper.classList.add('d-flex', 'w-100', 'justify-content-between');
		const title = document.createElement('h5');
		title.classList.add('mb-1');
		title.textContent = author;
		const body = document.createElement('p');
		body.classList.add('mb-1');
		body.textContent = comment;
		const small = document.createElement('small');
		small.textContent = email;

		itemWrapper.append(title);
		item.append(itemWrapper);
		item.append(body);
		item.append(small);

		return item
	}

	document.addEventListener('DOMContentLoaded', async () => {

		const pageParams = new URLSearchParams(window.location.search);
		const id = pageParams.get('id');
		const data = await getData(id);

		const wrapper = document.createElement('div');
		wrapper.classList.add('container', 'mt-3');
		const title = document.createElement('h1');
		title.textContent = data.data.title;
		const body = document.createElement('p');
		body.textContent = data.data.body;

		const comments = await getComments(id);

		wrapper.append(title);
		wrapper.append(body);
		document.body.append(wrapper);

		const listWrapper = document.createElement('div');
		listWrapper.classList.add('list-group', 'w-50');
		let item;
		if (comments.data.length === 0) {
			item = createComments('Комментариев нет');
			listWrapper.append(item);
		} else {
			for (let i = 0; i < comments.data.length; i++) {
				item = createComments(comments.data[i].name, comments.data[i].body, comments.data[i].email);
				listWrapper.append(item);
			}
		}

		wrapper.append(listWrapper);

	})

})();
