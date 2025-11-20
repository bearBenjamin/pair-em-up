const body = document.body;

export function listenersEvent(state) {
    console.log('body: ', body);

    body.addEventListener('click', (evt) => {
        handleActions(evt);
    })
    
    // const backBtn = document.querySelector('.btn-back-start');
    // console.log('state listenersEvent: ', state);
    // console.log('backBtn: ', backBtn);

    // backBtn.addEventListener('click', () => {
    //     state.currentScreen = 'start';
    //     renderStarScreen(state);
    // })
}

function handleActions(evt) {
    console.log('evt.target.className: ', evt.target.className);
}