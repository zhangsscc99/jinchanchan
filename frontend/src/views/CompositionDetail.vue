<template>
  <div class="composition-detail page-container" v-if="composition">
    <van-nav-bar 
      :title="composition.name" 
      left-arrow
      @click-left="goBack"
    />

    <!-- 阵容基本信息 -->
    <div class="composition-header">
      <van-card>
        <template #thumb>
          <div class="composition-thumb">
            <div class="tier-badge" :class="`tier-${composition.tier.toLowerCase().replace('-', 'minus')}`">
              {{ composition.tier }}
            </div>
          </div>
        </template>
        <template #title>
          <div class="header-title">
            {{ composition.name }}
            <van-tag size="mini" type="primary">{{ composition.level }}</van-tag>
          </div>
        </template>
        <template #desc>
          {{ composition.description }}
        </template>
      </van-card>
    </div>

    <!-- 阵容统计 -->
    <div class="composition-stats">
      <van-cell-group>
        <van-cell title="成型难度">
          <template #value>
            <van-rate 
              v-model="composition.difficulty" 
              readonly 
              size="16"
              color="#ffd21e"
              void-color="#eee"
            />
          </template>
        </van-cell>
        <van-cell title="流行度">
          <template #value>
            <van-rate 
              v-model="composition.popularity" 
              readonly 
              size="16"
              color="#ffd21e"
              void-color="#eee"
            />
          </template>
        </van-cell>
        <van-cell 
          v-if="composition.avgRank > 0"
          title="平均排名" 
          :value="`#${composition.avgRank}`" 
        />
      </van-cell-group>
    </div>

    <!-- 我的战绩 -->
    <div v-if="userStats" class="user-stats">
      <van-cell-group>
        <van-cell>
          <template #title>
            <span class="stats-title">我的战绩</span>
          </template>
          <template #value>
            <div class="stats-values">
              <span>{{ userStats.games }}局</span>
              <span class="win-rate" :class="getWinRateClass(userStats.winRate)">
                {{ userStats.winRate }}%
              </span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <van-tabs v-model:active="activeTab">
      <!-- 对局记录 -->
      <van-tab title="对局记录" name="records">
        <div class="tab-content">
          <div v-if="compositionRecords.length === 0" class="empty-state">
            <van-empty description="暂无使用该阵容的对局记录">
              <van-button round type="primary" @click="goToAddGame">
                添加对局记录
              </van-button>
            </van-empty>
          </div>
          <div v-else>
            <div 
              v-for="record in compositionRecords" 
              :key="record.id"
              class="record-item"
            >
              <van-card>
                <template #title>
                  <div class="record-header">
                    <span>第{{ record.rank }}名</span>
                    <van-tag 
                      :type="record.result === 'win' ? 'success' : 'danger'"
                      size="mini"
                    >
                      {{ record.result === 'win' ? '胜利' : '失败' }}
                    </van-tag>
                  </div>
                </template>
                <template #desc>
                  <div class="record-details">
                    <div class="hexes-used">
                      <span class="label">海克斯: </span>
                      <van-tag 
                        v-for="hex in record.hexes" 
                        :key="hex"
                        size="mini"
                        plain
                      >
                        {{ hex }}
                      </van-tag>
                    </div>
                    <div v-if="record.artifacts && record.artifacts.length > 0" class="artifacts-used">
                      <span class="label">神器: </span>
                      <van-tag 
                        v-for="artifact in record.artifacts" 
                        :key="artifact"
                        size="mini"
                        plain
                        type="warning"
                      >
                        {{ artifact }}
                      </van-tag>
                    </div>
                    <div v-if="record.notes" class="notes">
                      <span class="label">备注: </span>
                      <span>{{ record.notes }}</span>
                    </div>
                    <div class="timestamp">
                      {{ formatDate(record.timestamp) }}
                    </div>
                  </div>
                </template>
              </van-card>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 快速添加对局按钮 -->
    <div class="quick-add">
      <van-button 
        type="primary" 
        size="large" 
        round
        @click="quickAddGame"
      >
        使用该阵容添加对局
      </van-button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'CompositionDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const activeTab = ref('records')

    const composition = computed(() => {
      return store.getters.getCompositionById(route.params.id)
    })

    const userStats = computed(() => {
      return store.state.statistics.compositionStats[route.params.id]
    })

    const compositionRecords = computed(() => {
      return store.state.gameRecords
        .filter(record => record.compositionId === parseInt(route.params.id))
        .reverse()
    })

    const getWinRateClass = (winRate) => {
      const rate = parseFloat(winRate)
      if (rate >= 60) return 'high'
      if (rate >= 40) return 'medium'
      return 'low'
    }

    const formatDate = (timestamp) => {
      const date = new Date(timestamp)
      return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
    }

    const goBack = () => {
      router.go(-1)
    }

    const goToAddGame = () => {
      router.push('/add-game')
    }

    const quickAddGame = () => {
      // 预填充阵容信息到添加对局页面
      router.push({
        path: '/add-game',
        query: {
          compositionId: composition.value.id,
          compositionName: composition.value.name
        }
      })
    }

    return {
      activeTab,
      composition,
      userStats,
      compositionRecords,
      getWinRateClass,
      formatDate,
      goBack,
      goToAddGame,
      quickAddGame
    }
  }
}
</script>

<style scoped>
.composition-detail {
  background-color: #f8f8f8;
}

.composition-header {
  padding: 16px;
}

.composition-thumb {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
}

.tier-badge {
  color: white;
  font-weight: bold;
  font-size: 14px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.tier-s {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
}

.tier-sminus {
  background: linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%);
}

.tier-aplus {
  background: linear-gradient(135deg, #54a0ff 0%, #2e86de 100%);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.composition-stats {
  margin: 16px;
}

.user-stats {
  margin: 16px;
}

.stats-title {
  font-weight: 500;
  color: #333;
}

.stats-values {
  display: flex;
  align-items: center;
  gap: 12px;
}

.win-rate {
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.win-rate.high {
  background: #f0f9ff;
  color: #07c160;
}

.win-rate.medium {
  background: #fff7e6;
  color: #ff976a;
}

.win-rate.low {
  background: #ffeee6;
  color: #ee0a24;
}

.tab-content {
  padding: 16px;
}

.record-item {
  margin-bottom: 12px;
}

.record-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
}

.record-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.hexes-used, .notes {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.artifacts-used {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.timestamp {
  font-size: 11px;
  color: #999;
  text-align: right;
}

.empty-state {
  padding: 40px 0;
  text-align: center;
}

.quick-add {
  position: fixed;
  bottom: 70px;
  left: 16px;
  right: 16px;
  z-index: 100;
}
</style> 
