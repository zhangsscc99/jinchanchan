<template>
  <div class="profile page-container">
    <van-nav-bar title="个人中心" />
    
    <!-- 用户信息 -->
    <div class="user-info">
      <van-card>
        <template #thumb>
          <div class="avatar">
            <span class="avatar-text">金</span>
          </div>
        </template>
        <template #title>
          <span class="username">金铲铲玩家</span>
        </template>
        <template #desc>
          <div class="user-stats">
            <span>总对局: {{ statistics.totalGames }}</span>
            <span>总胜率: {{ statistics.winRate }}%</span>
          </div>
        </template>
        <template #tags>
          <van-tag v-if="getRankLevel()" :type="getRankLevel().type">
            {{ getRankLevel().text }}
          </van-tag>
        </template>
      </van-card>
    </div>

    <!-- 数据统计卡片 -->
    <div class="stats-cards">
      <van-row gutter="12">
        <van-col span="8">
          <div class="stat-card">
            <div class="stat-number">{{ statistics.totalGames }}</div>
            <div class="stat-label">总对局</div>
          </div>
        </van-col>
        <van-col span="8">
          <div class="stat-card">
            <div class="stat-number">{{ statistics.totalWins }}</div>
            <div class="stat-label">胜利</div>
          </div>
        </van-col>
        <van-col span="8">
          <div class="stat-card">
            <div class="stat-number">{{ statistics.winRate }}%</div>
            <div class="stat-label">胜率</div>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 功能菜单 -->
    <van-cell-group>
      <van-cell title="数据管理" is-link @click="showDataDialog = true">
        <template #icon>
          <van-icon name="chart-trending-o" />
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell title="应用设置" is-link @click="showSettingsDialog = true">
        <template #icon>
          <van-icon name="setting-o" />
        </template>
      </van-cell>
      <van-cell title="关于应用" is-link @click="showAboutDialog = true">
        <template #icon>
          <van-icon name="info-o" />
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 数据管理弹窗 -->
    <van-dialog
      v-model:show="showDataDialog"
      title="数据管理"
      :show-cancel-button="false"
    >
      <div class="data-info">
        <van-cell-group>
          <van-cell title="阵容数据" :value="`${compositions.length} 套`" />
          <van-cell title="对局记录" :value="`${gameRecords.length} 局`" />
          <van-cell title="海克斯数据" :value="`${Object.keys(hexStats).length} 个`" />
        </van-cell-group>
        <div class="data-note">
          <p>数据本地存储，不会上传到服务器</p>
        </div>
      </div>
    </van-dialog>

    <!-- 设置弹窗 -->
    <van-dialog
      v-model:show="showSettingsDialog"
      title="应用设置"
      :show-cancel-button="false"
    >
      <div class="settings-content">
        <van-cell-group>
          <van-cell title="夜间模式">
            <template #right-icon>
              <van-switch v-model="darkMode" size="24" />
            </template>
          </van-cell>
          <van-cell title="数据同步">
            <template #right-icon>
              <van-switch v-model="dataSync" size="24" />
            </template>
          </van-cell>
          <van-cell title="推送通知">
            <template #right-icon>
              <van-switch v-model="pushNotification" size="24" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-dialog>

    <!-- 关于应用弹窗 -->
    <van-dialog
      v-model:show="showAboutDialog"
      title="关于金铲铲助手"
      :show-cancel-button="false"
    >
      <div class="about-content">
        <div class="app-info">
          <div class="app-icon">🏆</div>
          <h3>金铲铲助手</h3>
          <p>版本 1.0.0</p>
        </div>
        <van-cell-group>
          <van-cell title="应用简介" label="帮助金铲铲玩家提高胜率的数据分析工具" />
          <van-cell title="支持版本" label="S14 七源计划赛季" />
          <van-cell title="开发者" label="金铲铲助手团队" />
        </van-cell-group>
        <div class="contact-info">
          <p>如有问题或建议，请联系我们</p>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Profile',
  setup() {
    const store = useStore()
    
    const showDataDialog = ref(false)
    const showSettingsDialog = ref(false)
    const showAboutDialog = ref(false)
    
    const darkMode = ref(false)
    const dataSync = ref(false)
    const pushNotification = ref(true)

    const statistics = computed(() => store.state.statistics)
    const compositions = computed(() => store.state.compositions)
    const gameRecords = computed(() => store.state.gameRecords)
    const hexStats = computed(() => store.state.statistics.hexStats)

    const getRankLevel = () => {
      const winRate = parseFloat(statistics.value.winRate)
      const totalGames = statistics.value.totalGames
      
      if (totalGames === 0) {
        return { text: '新手玩家', type: 'default' }
      }
      
      if (winRate >= 70) {
        return { text: '王者玩家', type: 'success' }
      } else if (winRate >= 60) {
        return { text: '钻石玩家', type: 'primary' }
      } else if (winRate >= 50) {
        return { text: '黄金玩家', type: 'warning' }
      } else if (winRate >= 40) {
        return { text: '白银玩家', type: 'default' }
      } else {
        return { text: '青铜玩家', type: 'danger' }
      }
    }

    return {
      showDataDialog,
      showSettingsDialog,
      showAboutDialog,
      darkMode,
      dataSync,
      pushNotification,
      statistics,
      compositions,
      gameRecords,
      hexStats,
      getRankLevel
    }
  }
}
</script>

<style scoped>
.profile {
  background-color: #f8f8f8;
}

.user-info {
  padding: 16px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.username {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.user-stats {
  display: flex;
  gap: 16px;
  margin-top: 4px;
}

.user-stats span {
  font-size: 12px;
  color: #666;
}

.stats-cards {
  padding: 0 16px 16px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 16px 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-number {
  font-size: 20px;
  font-weight: bold;
  color: #1989fa;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.van-cell-group {
  margin: 16px;
}

.van-cell__left-icon {
  color: #1989fa;
  margin-right: 12px;
}

.data-info {
  padding: 16px 0;
}

.data-note {
  padding: 16px;
  text-align: center;
}

.data-note p {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.settings-content {
  padding: 16px 0;
}

.about-content {
  padding: 16px 0;
}

.app-info {
  text-align: center;
  padding: 16px;
}

.app-icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.app-info h3 {
  font-size: 18px;
  color: #333;
  margin: 8px 0 4px;
}

.app-info p {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.contact-info {
  padding: 16px;
  text-align: center;
}

.contact-info p {
  font-size: 12px;
  color: #999;
  margin: 0;
}
</style> 
