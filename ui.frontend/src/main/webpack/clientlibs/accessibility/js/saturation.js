const saturationSlider = document.getElementById('saturation-slider');
saturationSlider.addEventListener('input', function() {
    document.body.style.filter = `saturate(${this.value}%)`;
});