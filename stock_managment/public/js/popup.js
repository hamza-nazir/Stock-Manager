let select = document.getElementById('product');
let form = document.getElementById('categoryForm');

select.addEventListener('change', () => {
  form.submit();
});
