#Simple jQuery read-more plugin
This plugin provides reveal/hide content with simple slide animation.

## Setup

### Html
```html
<div class="read-more js-read-more">
  <a href="#" class="read-more__trigger js-read-more-trigger>Read more</a>
  <div class="read-more__content js-read-more-content">
    ...content...
  </div>
</div>
```

### JavaScript
```javascript
$('.js-read-more').readMore();
```

## Requirements
Read-more plugin is written in jQuery(version 1.12+)

## License
Read-more plugin is released under an MIT License.
