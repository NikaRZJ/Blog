(() => {
    function getPage() {
        const pageParams = new URLSearchParams(window.location.searh);
        pageParams.has('page') ? numberPage = pageParams.get('page') : numberPage = 1;
        return numberPage;
    }

    // получение данных
    async function getData(numberPage) {
        const response = await fetch(`https://gorest.co.in/public-api/posts?page=${numberPage}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer 334ee326857f14be512f2f9e7760296d33a379e11816feed8f071f2f1826c762',
                'Content-Type': 'aplication/json',
            },
        })
        const data = await response.json();
        // console.log(data);
        return data;
    }

    // создание списка заголовков статей
    function getList(data) {
        const list = document.querySelector('.list-group');
        data.forEach(element => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            const link = document.createElement('a');
            link.setAttribute('href', `post.html?id=${element.id}`);
            link.setAttribute('id', element.id);
            link.textContent = element.title;
            li.append(link);
            list.append(li);
        });

        return list;
    }

    // создание элемента навигации
    function createFooterItem(numberPage) {
        const li = document.createElement('li');
        Number(getPage() === numberPage) ? li.classList.add('page-item', 'active') : li.classList.add('page-item');
        const link = document.createElement('a');
        link.classList.add('page-link');
        link.textContent = numberPage;
        numberPage === 1 ? link.setAttribute('href', 'index.html') : link.setAttribute('href', `index.html?page=${numberPage}`);
        li.append(link);
        return li;
    }

    function createFooterButton(text, alt) {
        const li = document.createElement('li');
        li.classList.add('page-item', 'button');

        const link = document.createElement('a');
        link.classList.add('page-link');
        link.setAttribute('aria-label', alt);

        const span = document.createElement('span');
        span.setAttribute('aria-hidden', 'true');
        span.textContent = text;

        const span2 = document.createElement('span');
        span2.classList.add('sr-only');
        span2.textContent = alt;

        link.append(span);
        link.append(span2);
        li.append(link);

        return link;
    }

    function createFooter(numberPage) {
        const footerList = createFooterList();

        let footerItem;

        for (let i = 1; i < 21; i++) {
            footerItem = createFooterItem(numberPage);
            footerList.list.append(footerItem);
            numberPage++;
        }
        const buttonBegin = createFooterButton('<<', 'Previous');
        const buttonPrevious = createFooterButton('<', 'Previous');
        const buttonNext = createFooterButton('>', 'Next');
        const buttonEnd = createFooterButton('>>', 'Next');

        buttonBegin.classList.add('begin');
        buttonPrevious.classList.add('previous');
        buttonNext.classList.add('next');
        buttonEnd.classList.add('end');

        footerList.list.prepend(buttonPrevious);
        footerList.list.prepend(buttonBegin);
        footerList.list.append(buttonNext);
        footerList.list.append(buttonEnd);

        return {
            footerList,
            buttonNext,
            buttonPrevious,
            buttonBegin,
            buttonEnd
        }
    }

    // создание меню навигации
    function createFooterList() {
        const footer = document.createElement('footer');
        footer.classList.add('footer');
        const nav = document.createElement('nav');
        nav.setAttribute('aria-label', 'page navigation');
        const list = document.createElement('ul');
        list.classList.add('pagination', 'justify-content-center');
        return {
            footer,
            nav,
            list
        }
    }

    document.addEventListener('DOMContentLoaded', async event => {
        event.preventDefault;
        let numberPage = Number(getPage());
        let articles = await getData(numberPage);
        const firstPage = 1;
        const lastPage = articles.meta.pagination.pages;
        // console.log(lastPage);

        let titleList = getList(articles.data);

        let footer;

        if (numberPage <= 15) {
            footer = createFooter(firstPage);
        } else
            if (numberPage === lastPage || lastPage - numberPage <= 5) {
                footer = createFooter(lastPage - 19);
            } else
                footer = createFooter(numberPage - 14);

        let footerList = footer.footerList;

        footerList.nav.append(footerList.list);
        footerList.footer.append(footerList.nav);
        document.body.append(footerList.footer);

        let items = footerList.list.children;
        let index;

        for (let item of items) {
            item.addEventListener('click', async event => {
                event.preventDefault;
                switch (1) {
                    case item.classList.contains('button'):
                }
            })
        }
    });
})();