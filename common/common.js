/**
 * Created by Yao on 2018/12/6.
 */
function renderMenu (menuList) {
  $.get('../common/menu-template.html', function (data) {
    // 模板渲染
    var render = template.compile(data)
    var str = render({data : menuList})
    $('.js_innerWrap').html(str)
    menuEventHandler(menuList)
  })
}

/**
 * 菜单事件监听
 */
function menuEventHandler (menuList) {

  $('.js_menuItem').on('click', function (event) {
    if($(event.target).hasClass('sub-menu-item')) { // 防止点击二级菜单时触发事件
      return false
    }
    $(this).addClass('active').siblings().removeClass('active').find('.js_subMenu').hide()
    var menuId = $(this).attr('menuId')
    var menuItem = menuList[menuId]
    // 渲染右侧内容模块
    var htmlStr = ''
    if (!menuItem.subMenu) {
      if (menuItem.type == 0) { // 纯文本
        htmlStr = '<div class="text">\n' +
          menuItem.content.text +
          '    </div>'
      } else if (menuItem.type == 1) { // 左文右图
        htmlStr = '<div class="text-img">\n' +
          '        <img src="'+ menuItem.content.img +'">\n' +
          menuItem.content.text +
          '    </div>'
      }
      $('.js_content').html(htmlStr)
    }else {
      $(this).find('.js_subMenu').toggle()
      $(this).find('.js_subMenuItem')[0].click()
    }
  })

  $('.js_subMenuItem').on('click', function (event) {
    $(this).addClass('active').siblings().removeClass('active')
    var menuId = $(this).attr('subMenuId').split("-")[0]
    var subMenuId = $(this).attr('subMenuId').split("-")[1]
    var subMenuItem = menuList[menuId].subMenu[subMenuId]
    var htmlStr = ''
    if (subMenuItem.type == 0) { // 纯文本
      htmlStr = '<div class="text">\n' +
        subMenuItem.content.text +
        '    </div>'
    } else if (subMenuItem.type == 1) { // 左文右图
      htmlStr = '<div class="text-img">\n' +
        '        <img src="'+ subMenuItem.content.img +'">\n' +
        subMenuItem.content.text +
        '    </div>'
    }
    $('.js_content').html(htmlStr)
  })

  $('.js_menuItem')[0].click()
}
