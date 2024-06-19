const bodyStyle = document.body.style

export function bodyDisabler(unlock)
{
    bodyStyle.overflowY = unlock? "auto" : "hidden"
    bodyStyle.pointerEvents = unlock? "auto" : "none"
    window.scrollTo({ top: 0, behavior: 'smooth' });
}