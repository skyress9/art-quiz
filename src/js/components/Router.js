class Router {
  
  static hide(page) {
    page.classList.add('hide');
  }

  static openPage(page) {
    setTimeout(() => {
      page.classList.remove('hide');
    }, 1);
  }

  static changePage(route, root = this.root) {
    const pastPage = root.firstElementChild;
    let newPage;
    if (typeof route == 'string') {
      this.pages[route].render();
      newPage = this.pages[route].element;
    } else {
      newPage = route;
    }

    this.hide(pastPage);

    pastPage.ontransitionend = e => {

      if (e.target.classList.value == pastPage.classList.value) {
        this.removePage(pastPage);
        root.prepend(newPage);
        this.openPage(newPage);
        pastPage.ontransitionend = null;
      }
    }
  }

  static removePage(page) {
    page.remove();
  }
}

export default Router;