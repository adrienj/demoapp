const offsetInfiniteScroll = 200;

const ScrollMixin = {

    _onScroll(e) {
        clearTimeout(this.onScrollTimeout);
        this.onScrollTimeout = setTimeout(() => {
            let {scrollTop} = this.refs.scrollContainer;

            // Infinite scroll
            if (scrollTop > this.refs.scrollContainer.scrollHeight - this.refs.scrollContainer.offsetHeight - offsetInfiniteScroll
              && !this.state.loadingComics) {
                this._loadMore();
            }
            // Show go-to-top button
            if (this.state.showGoToTop !== (scrollTop > 30)) {
                this.setState({
                    showGotoTop: scrollTop > 30
                });
            }
        }, 100);
    },

    _goToTop(e) {
        e.stopPropagation();
        this.refs.scrollContainer.scrollTop = 0;
    }

};

export default ScrollMixin;
