import { getStyle } from '../../config/mUtils'
import { imgBaseUrl, localapi, proapi } from '../../config/env'

export const loadMore = {
    directives: {
        'load-more': {
            bind: (el, binding) => {
                let windowHeight = window.screen.height;
                let height;
                let setTop;
                let paddingBottom;
                let paddingTop;
                let marginBottom;
                let marginTop;
                let requestFram;
                let oldScrollTop;
                let scrollEl;
                let heightEl;
                let scrollType = el.attributes.type && el.attributes.type.value;
                let scrollReduce = 2;
                if (scrollType == 2) {
                    scrollEl = el;
                    heightEl = el.children[0];
                } else {
                    scrollEl = document.body;
                    heightEl = el;
                }

                el.addEventListener('touchstart', () => {
                    height = heightEl.scrollHeight;
                    // if (scrollType == 2) {
                    //     height = height
                    // }
                    // setTop = el.offsetTop;

                    paddingBottom = getStyle(heightEl, 'paddingBottom');
                    paddingTop = getStyle(heightEl, 'paddingTop');
                    marginBottom = getStyle(heightEl, 'marginBottom');
                    marginTop = getStyle(heightEl, 'marginTop');
                    console.log(marginBottom)
                }, false)

                el.addEventListener('touchmove', () => {
                    loadMore();
                }, false)

                el.addEventListener('touchend', () => {
                    oldScrollTop = scrollEl.scrollTop;

                    // console.log(scrollEl.clientHeight);
                    // console.log(heightEl.scrollHeight);
                    // console.log(scrollEl.scrollTop);
                    // alert(scrollEl.scrollTop);
                    // alert(scrollEl.offsetHeight);
                    // // // 472
                    // alert(heightEl.offsetHeight);
                    // // // 623

                    // // // 153
                    loadMore()
                        // if (scrollEl.scrollTop == heightEl.clientHeight - scrollEl.clientHeight + 1) {
                        //     alert(3333);
                        // }
                        // moveEnd();
                }, false)

                const moveEnd = () => {
                    requestFram = requestAnimationFrame(() => {
                        if (scrollEl.scrollTop != oldScrollTop) {
                            oldScrollTop = scrollEl.scrollTop;
                            moveEnd()
                        } else {
                            cancelAnimationFrame(requestFram);
                            height = heightEl.clientHeight;
                            loadMore();
                        }
                    })
                }

                const loadMore = () => {
                    // if (scrollEl.scrollTop == height - scrollEl.clientHeight) {
                    // alert(height - (heightEl.clientHeight + scrollEl.scrollTop));
                    if ((heightEl.clientHeight - scrollEl.clientHeight - scrollEl.scrollTop) < 3) {
                        binding.value();
                        console.log(4555)
                    }
                }
            }
        }
    }
};

export const getImgPath = {
    methods: {
        //传递过来的图片地址需要处理后才能正常使用
        getImgPath(path) {
            let suffix;
            if (!path) {
                return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg'
            }
            if (path.indexOf('jpeg') !== -1) {
                suffix = '.jpeg'
            } else {
                suffix = '.png'
            }
            let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
            return 'https://fuss10.elemecdn.com' + url
        },
    }

}