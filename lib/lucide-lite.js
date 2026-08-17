(function(){
  var iconPaths = {
    'calendar-days': ['M8 2v4','M16 2v4','M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2','M3 10h18','M8 14h.01','M12 14h.01','M16 14h.01','M8 18h.01','M12 18h.01'],
    'calendar-plus': ['M8 2v4','M16 2v4','M3 10h18','M5 4h14a2 2 0 0 1 2 2v7','M13 21H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2','M19 16v6','M16 19h6'],
    'chevron-left': ['m15 18-6-6 6-6'],
    'chevron-right': ['m9 18 6-6-6-6'],
    'chevron-up': ['m18 15-6-6-6 6'],
    'chevron-down': ['m6 9 6 6 6-6'],
    'search': ['M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16','m21 21-4.3-4.3'],
    'trash-2': ['M3 6h18','M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2','M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6','M10 11v6','M14 11v6'],
    'x': ['M18 6 6 18','m6 6 12 12'],
    'sparkles': ['m12 3-1.9 4.7L5.4 9.6l4.7 1.9L12 16l1.9-4.5 4.7-1.9-4.7-1.9Z','M5 3v4','M3 5h4','M19 17v4','M17 19h4'],
    'message-circle-question': ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z','M9.1 9a3 3 0 1 1 5.8 1c0 2-3 3-3 3','M12 17h.01'],
    'messages-square': ['M7 8h10','M7 12h6','M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z'],
    'message-square-off': ['m2 2 20 20','M8.5 3H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2','M9 17H7l-4 4V5a2 2 0 0 1 .6-1.4','M8 9h.01','M12 13h.01'],
    'shield-check': ['M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z','m9 12 2 2 4-4'],
    'check': ['m20 6-11 11-5-5'],
    'git-compare-arrows': ['m13 17 5-5-5-5','M18 12H6','m11 7-5 5 5 5','M6 12h12'],
    'scan-search': ['M3 7V5a2 2 0 0 1 2-2h2','M17 3h2a2 2 0 0 1 2 2v2','M21 17v2a2 2 0 0 1-2 2h-2','M7 21H5a2 2 0 0 1-2-2v-2','M8 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0','m16 16-2.5-2.5'],
    'bug': ['M8 2v4','M16 2v4','M3 13h4','M17 13h4','M6 9H3','M21 9h-3','M6 17H3','M21 17h-3','M8 6h8a2 2 0 0 1 2 2v8a6 6 0 0 1-12 0V8a2 2 0 0 1 2-2'],
    'refresh-cw': ['M21 12a9 9 0 0 0-15.5-6.2L3 8','M3 3v5h5','M3 12a9 9 0 0 0 15.5 6.2L21 16','M16 16h5v5'],
    'send': ['m22 2-7 20-4-9-9-4Z','M22 2 11 13'],
    'flag': ['M5 21V4','M5 4h11l-2 4 2 4H5'],
    'message-circle': ['M20 11a8 8 0 0 1-8 8H5l-3 3V11a8 8 0 1 1 18 0Z'],
    'user-round-cog': ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2','M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8','M19.4 15a1.7 1.7 0 0 0 0 3.4','M21 16.7a1.7 1.7 0 0 0-1.6-1.7','M19.4 18.4a1.7 1.7 0 0 0 1.6-1.7','M17.7 16.7a1.7 1.7 0 0 0 1.7-1.7'],
    'shuffle': ['M3 3h2l14 18h2','M19 3h2l-4 5','M3 21h2l4-5'],
    'compass': ['m12 2 3 7-3 13-3-13Z','M15 9 22 12l-7 3','M9 9 2 12l7 3'],
    'graduation-cap': ['M21.4 10.9a1 1 0 0 0 0-1.8l-8.6-3.9a2 2 0 0 0-1.7 0L2.6 9.1a1 1 0 0 0 0 1.8l8.6 3.9a2 2 0 0 0 1.7 0Z','M22 10v6','M6 12.5V16a6 3 0 0 0 12 0v-3.5'],
    'users-round': ['M18 21a8 8 0 0 0-16 0','M10 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8','M22 20c0-3.4-2-5.5-4-6','M16 3.1a4 4 0 0 1 0 7.8'],
    'presentation': ['M2 3h20','M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3','m7 21 5-5 5 5','m7 8 2 2 4-4 2 2 2-2'],
    'message-square-reply': ['M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z','m10 8-3 3 3 3','M7 11h6a2 2 0 0 1 2 2v1'],
    'school': ['M3 10 12 3l9 7','M5 10v10h14V10','M9 20v-6h6v6'],
    'book-open': ['M3 5a3 3 0 0 1 3-3h6v18H6a3 3 0 0 0-3 3Z','M21 5a3 3 0 0 0-3-3h-6v18h6a3 3 0 0 1 3 3Z'],
    'file-text': ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z','M14 2v6h6','M8 13h8','M8 17h6'],
    'trending-up': ['m3 17 6-6 4 4 8-8','M14 7h7v7'],
    'briefcase-business': ['M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2','M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z','M3 13h18','M10 13v2h4v-2'],
    'users': ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2','M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8','M22 21v-2a4 4 0 0 0-3-3.87','M16 3.13a4 4 0 0 1 0 7.75'],
    'route': ['M3 6h4l3 12h4l3-12h4','M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0','M21 18a2 2 0 1 0-4 0 2 2 0 0 0 4 0'],
    'circle-check': ['M22 11.1V12a10 10 0 1 1-5.9-9.1','m9 11 3 3L22 4'],
    'message-square-plus': ['M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z','M12 8v6','M9 11h6'],
    'square-kanban': ['M3 3h18v18H3Z','M8 8v7','M12 8v3','M16 8v5'],
    'layout-dashboard': ['M3 3h7v7H3Z','M14 3h7v7h-7Z','M3 14h7v7H3Z','M14 14h7v7h-7Z'],
    'arrow-right': ['M5 12h14','m13 6 6 6-6 6'],
    'inbox': ['M4 4h16l2 10v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4Z','M2 14h5l2 3h6l2-3h5'],
    'arrow-up-right': ['M7 17 17 7','M7 7h10v10'],
    'badge-check': ['M12 3 14 5l3-.2.8 2.8L20 9l-.8 3 1.8 2.2-2.2 2.1-.8 2.8-3-.1-2 2-2-2-3 .1-.8-2.8L4 14.2 5.8 12 5 9l2.2-1.4L8 4.8 11 5Z','m9 12 2 2 4-4'],
    'map-pin': ['M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z','M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
    'palette': ['M12 3a9 9 0 1 0 0 18h1.5a1.5 1.5 0 0 0 0-3H12a2 2 0 0 1 0-4h4a5 5 0 0 0 0-10Z','M7.5 10h.01','M9.5 7h.01','M14.5 7h.01','M16.5 10h.01']
    ,'bookmark': ['M6 3a2 2 0 0 0-2 2v16l8-5 8 5V5a2 2 0 0 0-2-2Z']
    ,'bookmark-check': ['M6 3a2 2 0 0 0-2 2v16l8-5 8 5V5a2 2 0 0 0-2-2Z','m9 10 2 2 4-4']
    ,'columns-3': ['M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2','M9 3v18','M15 3v18']
    ,'list-checks': ['m3 5 2 2 4-4','M11 6h10','m3 12 2 2 4-4','M11 13h10','m3 19 2 2 4-4','M11 20h10']
    ,'shield-off': ['m2 2 20 20','M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l3.1-1.2','M14.6 3.1 20 5v8','M8.4 8.4 4 5']
    ,'pencil': ['M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2 2 22l7.8-1 11.4-11.4a2 2 0 0 0 0-2.8Z','m14 4 6 6','M3 14.2 9.8 21']
    ,'archive': ['M21 8v13H3V8','M1 3h22v5H1Z','M10 12h4']
    ,'archive-restore': ['M21 8v13H3V8','M1 3h22v5H1Z','m9 16 3-3 3 3','M12 13v5']
    ,'layout-grid': ['M3 3h7v7H3Z','M14 3h7v7h-7Z','M3 14h7v7H3Z','M14 14h7v7h-7Z']
    ,'bar-chart-3': ['M3 3v18h18','M18 17V9','M13 17V5','M8 17v-3']
    ,'calendar-clock': ['M8 2v4','M16 2v4','M3 10h18','M5 4h14a2 2 0 0 1 2 2v6.5','M16 19h6','M19 16v3l2 1']
    ,'mouse-pointer-click': ['m9 9 5 12 2-5 5-2Z','M7 2 8 5','M2 7l3 1','M14 4l-2 2']
    ,'clock-3': ['M12 6v6h-4','M22 12a10 10 0 1 1-10-10 10 10 0 0 1 10 10']
    ,'circle-dashed': ['M10.1 2.2a10 10 0 0 1 3.8 0','M17.6 4.4a10 10 0 0 1 2 3.3','M21.8 10.1a10 10 0 0 1 0 3.8','M19.6 17.6a10 10 0 0 1-3.3 2','M13.9 21.8a10 10 0 0 1-3.8 0','M6.4 19.6a10 10 0 0 1-2-3.3','M2.2 13.9a10 10 0 0 1 0-3.8','M4.4 6.4a10 10 0 0 1 3.3-2']
    ,'user-round-check': ['M2 21a8 8 0 0 1 16 0','M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8','m16 11 2 2 4-4']
    ,'link-2-off': ['m9 17-1.5 1.5a4 4 0 0 1-5.7-5.7L5 9.6','m14.5 5.5 2-2a4 4 0 0 1 5.7 5.7L18 11.4','m8 12 4-4','m2 2 20 20']
    ,'layers-3': ['m12 2 9 5-9 5-9-5Z','m3 12 9 5 9-5','m3 17 9 5 9-5']
    ,'copy': ['M8 8h12v12H8Z','M4 16H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1']
    ,'eye': ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12','M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6']
    ,'lock-keyhole': ['M6 10V8a6 6 0 0 1 12 0v2','M5 10h14v12H5Z','M12 14v4']
    ,'plus': ['M12 5v14','M5 12h14']
    ,'arrow-left': ['M19 12H5','m12 19-7-7 7-7']
    ,'arrow-left-right': ['M8 3 4 7l4 4','M4 7h16','m8 10 4 4-4 4','M20 17H4']
    ,'tags': ['M9 3H4a1 1 0 0 0-1 1v5l8 8 6-6Z','M13 3h5a3 3 0 0 1 3 3v5l-8 8-2-2','M6.5 6.5h.01']
  };

  function createIcon(name){
    var ns='http://www.w3.org/2000/svg';
    var svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 24 24');
    svg.setAttribute('width','17');
    svg.setAttribute('height','17');
    svg.setAttribute('aria-hidden','true');
    svg.setAttribute('focusable','false');
    svg.style.display = 'inline-block';
    svg.style.verticalAlign = 'middle';
    if(iconPaths[name]){
      svg.setAttribute('fill','none');
      svg.setAttribute('stroke','currentColor');
      svg.setAttribute('stroke-width','2');
      svg.setAttribute('stroke-linecap','round');
      svg.setAttribute('stroke-linejoin','round');
      iconPaths[name].forEach(function(data){
        var path=document.createElementNS(ns,'path');
        path.setAttribute('d',data);
        svg.appendChild(path);
      });
    } else {
      var circle=document.createElementNS(ns,'circle');
      circle.setAttribute('cx','12');circle.setAttribute('cy','12');circle.setAttribute('r','10');
      circle.setAttribute('fill','currentColor');
      svg.appendChild(circle);
    }
    return svg;
  }
  window.lucide = {
    createIcons: function(){
      // Replace <i data-lucide="name"></i> with a simple placeholder SVG
      document.querySelectorAll('[data-lucide]').forEach(function(el){
        try {
          var tag = el.tagName.toLowerCase();
          var name = el.getAttribute('data-lucide') || '';
          var svg = createIcon(name);
          // copy classes so CSS sizing/color can apply
          if (el.className) svg.setAttribute('class', el.className);
          // copy inline styles
          if (el.getAttribute('style')) svg.setAttribute('style', el.getAttribute('style'));
          // preserve aria-hidden / role if present
          if (el.hasAttribute('aria-hidden')) svg.setAttribute('aria-hidden', el.getAttribute('aria-hidden'));
          el.parentNode.replaceChild(svg, el);
        } catch (e) {
          // ignore individual icon errors
          console.error('lucide-lite icon error', e);
        }
      });
    }
  };
})();
