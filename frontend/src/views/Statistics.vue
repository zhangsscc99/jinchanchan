<template>
  <div class="statistics page-container">
    <van-nav-bar title="统计分析" />
    
    <!-- 总体统计 -->
    <div class="overall-stats">
      <van-card title="总体战绩">
        <template #desc>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value">{{ statistics.totalGames }}</div>
              <div class="stat-label">总对局</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ statistics.totalWins }}</div>
              <div class="stat-label">胜利场次</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ statistics.winRate }}%</div>
              <div class="stat-label">胜率</div>
            </div>
          </div>
        </template>
      </van-card>
    </div>

    <van-tabs v-model:active="activeTab">
      <!-- 阵容统计 -->
      <van-tab title="阵容统计" name="compositions">
        <div class="stats-content">
          <div v-if="Object.keys(compositionStats).length === 0" class="empty-state">
            <van-empty description="暂无阵容数据">
              <van-button round type="primary" @click="goToAddGame">
                添加对局记录
              </van-button>
            </van-empty>
          </div>
          <div v-else>
            <div 
              v-for="(stat, compositionId) in compositionStats" 
              :key="compositionId"
              class="stat-card"
            >
              <van-card>
                <template #title>
                  <div class="composition-name">
                    {{ getCompositionName(compositionId) }}
                    <van-tag 
                      :type="getWinRateType(stat.winRate)" 
                      size="mini"
                    >
                      {{ stat.winRate }}%
                    </van-tag>
                  </div>
                </template>
                <template #desc>
                  <div class="stat-details">
                    <span>对局: {{ stat.games }}</span>
                    <span>胜利: {{ stat.wins }}</span>
                    <van-progress 
                      :percentage="parseFloat(stat.winRate)" 
                      :color="getProgressColor(stat.winRate)"
                      :show-pivot="false"
                    />
                  </div>
                </template>
              </van-card>
            </div>
          </div>
        </div>
      </van-tab>

      <!-- 海克斯统计 -->
      <van-tab title="海克斯统计" name="hexes">
        <div class="stats-content">
          <div v-if="Object.keys(hexStats).length === 0" class="empty-state">
            <van-empty description="暂无海克斯数据">
              <van-button round type="primary" @click="goToAddGame">
                添加对局记录
              </van-button>
            </van-empty>
          </div>
          <div v-else>
            <div class="hex-stats-header">
              <van-cell-group>
                <van-cell>
                  <template #title>
                    <span>排序方式</span>
                  </template>
                  <template #value>
                    <van-switch 
                      v-model="sortByWinRate"
                      active-text="按胜率"
                      inactive-text="按使用次数"
                    />
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
            
            <div 
              v-for="hex in sortedHexStats" 
              :key="hex.name"
              class="stat-card"
            >
              <van-card>
                <template #title>
                  <div class="hex-name">
                    {{ hex.name }}
                    <van-tag 
                      :type="getWinRateType(hex.winRate)" 
                      size="mini"
                    >
                      {{ hex.winRate }}%
                    </van-tag>
                  </div>
                </template>
                <template #desc>
                  <div class="stat-details">
                    <span>使用: {{ hex.games }}次</span>
                    <span>胜利: {{ hex.wins }}次</span>
                    <van-progress 
                      :percentage="parseFloat(hex.winRate)" 
                      :color="getProgressColor(hex.winRate)"
                      :show-pivot="false"
                    />
                  </div>
                </template>
              </van-card>
            </div>
          </div>
        </div>
      </van-tab>

      <!-- 详细记录 -->
      <van-tab title="对局记录" name="records">
        <div class="stats-content">
          <div v-if="gameRecords.length === 0" class="empty-state">
            <van-empty description="暂无对局记录">
              <van-button round type="primary" @click="goToAddGame">
                添加对局记录
              </van-button>
            </van-empty>
          </div>
          <div v-else>
            <div 
              v-for="record in gameRecords" 
              :key="record.id"
              class="record-card"
            >
              <van-card>
                <template #title>
                  <div class="record-header">
                    <span>{{ record.compositionName }}</span>
                    <van-tag 
                      :type="record.result === 'win' ? 'success' : 'danger'"
                      size="mini"
                    >
                      第{{ record.rank }}名
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
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Statistics',
  setup() {
    const router = useRouter()
    const store = useStore()
    const activeTab = ref('compositions')
    const sortByWinRate = ref(true)

    const statistics = computed(() => store.state.statistics)
    const compositionStats = computed(() => store.state.statistics.compositionStats)
    const hexStats = computed(() => store.state.statistics.hexStats)
    const gameRecords = computed(() => [...store.state.gameRecords].reverse())
    const compositions = computed(() => store.state.compositions)

    const getCompositionName = (compositionId) => {
      const comp = compositions.value.find(c => c.id === parseInt(compositionId))
      return comp ? comp.name : '未知阵容'
    }

    const getWinRateType = (winRate) => {
      const rate = parseFloat(winRate)
      if (rate >= 60) return 'success'
      if (rate >= 40) return 'warning'
      return 'danger'
    }

    const getProgressColor = (winRate) => {
      const rate = parseFloat(winRate)
      if (rate >= 60) return '#07c160'
      if (rate >= 40) return '#ff976a'
      return '#ee0a24'
    }

    const sortedHexStats = computed(() => {
      const hexList = Object.entries(hexStats.value).map(([name, stat]) => ({
        name,
        ...stat
      }))
      
      if (sortByWinRate.value) {
        return hexList.sort((a, b) => parseFloat(b.winRate) - parseFloat(a.winRate))
      } else {
        return hexList.sort((a, b) => b.games - a.games)
      }
    })

    const formatDate = (timestamp) => {
      const date = new Date(timestamp)
      return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
    }

    const goToAddGame = () => {
      router.push('/add-game')
    }

    return {
      activeTab,
      sortByWinRate,
      statistics,
      compositionStats,
      hexStats,
      gameRecords,
      sortedHexStats,
      getCompositionName,
      getWinRateType,
      getProgressColor,
      formatDate,
      goToAddGame
    }
  }
}
</script>

<style scoped>
.statistics {
  background-color: #f8f8f8;
}

.overall-stats {
  padding: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 12px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #1989fa;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.stats-content {
  padding: 16px;
}

.stat-card, .record-card {
  margin-bottom: 12px;
}

.composition-name, .hex-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
}

.record-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
}

.stat-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.stat-details span {
  font-size: 12px;
  color: #666;
  margin-right: 16px;
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

.hex-stats-header {
  margin-bottom: 16px;
}

.empty-state {
  padding: 40px 0;
  text-align: center;
}

.van-progress {
  margin-top: 4px;
}
</style> 
