function shareLink() {
    const link = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: 'My CV',
            url: link
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch(console.error);
    } else {
        alert('Copy this link: ' + link);
    }
}