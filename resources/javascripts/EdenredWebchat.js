class EdenredWebchat {
    constructor(endpoint, params = {}) {
        this.cognigyEndpoint = endpoint;
        this.params = params;
        this.BOTTOM_DISTANCE = 70;
    }
    
    initEdenredWebchat(autoOpen = false) {
        // Create a "New Message" indicator
        const newMessageIndicator = document.createElement('div');
        newMessageIndicator.id = 'newMessageIndicator';
        newMessageIndicator.textContent = 'Nouveau message';
        newMessageIndicator.style.cssText = `
            position: relative;
            height: 18px;
            margin-top: -18px;
            background: linear-gradient(0deg, rgba(220, 38, 25, 0.2), transparent);
            color: #dc2619;
            text-align: center;
            font-size: 12px;
            z-index: 1000;
        `;
        let container = null
        let currentScrollTop = 0;
        const waitForElment = this.waitForElm.bind(this);
        const BOTTOM_DISTANCE = this.BOTTOM_DISTANCE;

        const addOpenChatListener = () => {
            waitForElment("[data-cognigy-webchat-toggle]").then((elm) => {
                document.querySelector("[data-cognigy-webchat-toggle]").addEventListener("click", function (event) {
                    waitForElment("#webchatChatHistory").then((elm) => {
                        container = document.querySelector('#webchatChatHistory');
                        
                        container.addEventListener('scroll', () => {
                            currentScrollTop = container.scrollTop;
                            const isAtBottom = container.scrollHeight - container.scrollTop - BOTTOM_DISTANCE <= container.clientHeight;

                            if (isAtBottom) {
                                // Remove the "New Message" indicator when at the bottom
                                let newMessageIndicator = document.querySelector('#newMessageIndicator');
                                if(newMessageIndicator) newMessageIndicator.remove();
                            }
                        });
                        
                        let visibleView = window.visualViewport;
                        let maxViewHeight = document.documentElement.clientHeight;

                        visibleView.addEventListener( 'resize', function func() {
                            let visibleViewHeight = visibleView.height;
                            let visibleViewWidth = visibleView.width;                            

                            if(visibleViewWidth < 575){
                                let webchat_content = document.querySelector('[data-cognigy-webchat]');
                                let webchat_header = document.querySelector('.webchat-header-bar');
                                if ( visibleViewHeight < maxViewHeight ){
                                    webchat_content.style.cssText = `height: ${visibleViewHeight}px; top: ${maxViewHeight - visibleViewHeight}px`;
                                    webchat_header.style.cssText = 'padding-top: 10px;padding-bottom: 10px;'
                                }else{
                                    webchat_content.style.cssText = '';
                                    webchat_header.style.cssText = ''
                                }
                            }
                        });
                    });
                })
            });
        }


        return initWebchat(this.cognigyEndpoint, this.params).then(
            (webchat) => {
                addOpenChatListener(); //Prepare events on open chat
    
                webchat.registerAnalyticsService((event) => {
                    if (event.type === "webchat/incoming-message") { // Event when bot send message
                        if(container) {
                            setTimeout(() => {
                                container.scrollTo({
                                    top: currentScrollTop
                                });
                                const isAtBottom = container.scrollHeight - container.scrollTop - BOTTOM_DISTANCE <= container.clientHeight;
                                
                                if(!isAtBottom) container.insertAdjacentElement('afterend', newMessageIndicator);
    
                            }, 10);
                        }
                    }
                })
            }
        )
    }

    waitForElm(selector) {
        return new Promise((resolve) => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver((mutations) => {
                if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        });
    }
}