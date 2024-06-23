function showNav() {
    document.getElementById('myNav').classList.add('d-block','myNavColumn');
    document.getElementById('headerWidth').classList.add('headerWidthColumn');
    document.getElementById('headerLogo').classList.add('d-none');
    document.getElementById('openDropDownIcon').classList.add('d-none');
    document.getElementById('closeDropDownIcon').classList.add('d-block');
}
function hideNav() {
    document.getElementById('myNav').classList.remove('d-block','myNavColumn');
    document.getElementById('headerWidth').classList.remove('headerWidthColumn');
    document.getElementById('headerLogo').classList.remove('d-none');
    document.getElementById('openDropDownIcon').classList.remove('d-none');
    document.getElementById('closeDropDownIcon').classList.remove('d-block');
}